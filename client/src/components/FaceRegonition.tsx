import { useMyContext } from '../context/context';

const FaceRegonition = () => {
  const { imageUrl } = useMyContext();
  const { box } = useMyContext();
  return (
    imageUrl && (
      <div className="relative">
        <img
          src={imageUrl}
          alt="face img"
          width="500px"
          height={imageUrl ? 'auto' : '300px'}
          id="inputImage"
          className="my-6 mx-auto block"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    )
  );
};

export default FaceRegonition;
