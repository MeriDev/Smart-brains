import { useState, useEffect } from 'react';
import { useMyContext } from '../context/context';

import axios from 'axios';
import { toast } from 'react-toastify';

interface BoundingBox {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
}

interface Region {
  boundingBox: BoundingBox;
}

const ImageLinkForm = () => {
  const {
    imageUrl,
    setImageUrl,
    setBoxDimensions,
    error,
    setError,
    setImageLoaded,
  } = useMyContext();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBoxDimensions([]);
  }, [imageUrl]);

  const DetectFaces = async (): Promise<Region[]> => {
    const response = await axios.post('http://localhost:8000/detect', {
      imageUrl: imageUrl,
    });
    return response.data.results;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value.trim());
    setImageLoaded(false);
    setError('');

    if (imageUrl && !imageUrl.endsWith('.jpg')) {
      setError('Please enter a valid .jpg image URL.');
      setImageUrl('');
      toast.error(error, { position: 'top-center', autoClose: 3000 });
    } else {
      setError('');
    }
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!imageUrl) {
        setError('Please provide a valid image URL.');
        toast.error(error, {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: true,
        });
        setLoading(false);
        return;
      }

      const results = await DetectFaces();
      const faceBoxes = results.map((region: Region) => {
        const { topRow, leftCol, rightCol, bottomRow } = region.boundingBox;

        const image =
          (document.getElementById('inputImage') as HTMLImageElement) ?? null;
        const width = Number(image.width);
        const height = Number(image.height);

        return {
          left: leftCol * width,
          top: topRow * height,
          right: width - rightCol * width,
          bottom: height - bottomRow * height,
        };
      });
      setBoxDimensions(faceBoxes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center pt-8 max-w-2xl mx-auto">
      <p className="text-3xl mb-7 tracking-wider font-DotGothic16">
        This magic brain will detect faces in your pictures, Give it a try!!
      </p>
      <form onSubmit={onSubmitForm} className="imageForm">
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          placeholder="Enter your image Url ..."
          onChange={onInputChange}
          className=" bg-white/70 py-1 px-3 text-lg w-2/3 rounded-tl-md rounded-bl-md"
        />
        <button className="btn" type="submit">
          {loading ? 'Loading...' : 'Detect'}
        </button>
      </form>
    </div>
  );
};

export default ImageLinkForm;
