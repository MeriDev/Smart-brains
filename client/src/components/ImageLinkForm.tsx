import { useMyContext } from '../context/context';

import axios from 'axios';

const ImageLinkForm = () => {
  const { imageUrl, setImageUrl } = useMyContext();
  const { setBox } = useMyContext();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value.trim());
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/detect', {
        imageUrl: imageUrl,
      });
      const results = response.data.results;

      results.forEach(region => {
        const faceBoxDimentions = region.boundingBox;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        const faceBox = {
          leftCol: faceBoxDimentions.leftCol * width,
          topRow: faceBoxDimentions.topRow * height,
          rightCol: width - faceBoxDimentions.rightCol * width,
          bottomRow: height - faceBoxDimentions.bottomRow * height,
        };
        console.log(faceBox);
        setBox(faceBox);
      });
    } catch (error) {
      console.error(error);
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
        <button className="bg-pink-700/70 font-semibold text-white py-1 px-2 hover:bg-pink-500/50 text-lg rounded-tr-md rounded-br-md cursor-pointer">
          Detect
        </button>
      </form>
    </div>
  );
};

export default ImageLinkForm;
