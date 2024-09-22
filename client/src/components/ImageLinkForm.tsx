import { useState } from 'react';
import axios from 'axios';

const ImageLinkForm = () => {
  const [fieldInput, setFieldInput] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldInput(e.target.value);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/detect', {
        imageUrl: 'https://samples.clarifai.com/metro-north.jpg',
      });
      // const results = response.data.results;
      console.log(response.data);
      // results.forEach(region => {

      // });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center pt-8 max-w-2xl mx-auto">
      <p className="text-3xl mb-7 tracking-wider font-DotGothic16">
        This magic brain will detect faces in your pictures, Give it a try!!
      </p>
      <form
        onSubmit={onSubmitForm}
        className="relative w-full flex justify-center items-center shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur px-4 py-8 border-red-900 rounded-sm shadow-md hover:scale-105 transition-all ease-in-out duration-500"
      >
        <input
          type="text"
          name="imageUrl"
          value={fieldInput}
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
