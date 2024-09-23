import { useState } from 'react';
import { useMyContext } from '../context/context';

import axios from 'axios';

const ImageLinkForm = () => {
  const { imageUrl, setImageUrl, setBoxDimentions } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value.trim());
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!imageUrl) {
        setError('Please provide a valid image URL.');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:8000/detect', {
        imageUrl: imageUrl,
      });
      const results = response.data.results;
      const faceBoxes = results.map(region => {
        const { topRow, leftCol, rightCol, bottomRow } = region.boundingBox;

        const image = document.getElementById(
          'inputImage'
        ) as HTMLImageElement | null;
        const width = Number(image.width);
        const height = Number(image.height);

        return {
          left: leftCol * width,
          top: topRow * height,
          right: width - rightCol * width,
          bottom: height - bottomRow * height,
        };
      });
      setBoxDimentions(faceBoxes);
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
