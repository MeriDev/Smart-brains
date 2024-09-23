import { useMyContext } from '../context/context';

const FaceRegonition = () => {
  const { imageUrl } = useMyContext();
  const { boxDimentions } = useMyContext();

  return (
    imageUrl && (
      <div className="relative max-w-96 mx-auto">
        <img
          src={imageUrl}
          alt="face img"
          width="500px"
          height={imageUrl ? 'auto' : '300px'}
          id="inputImage"
          className="my-6 w-full block"
        />
        {boxDimentions.map((box, i) => {
          const { top, bottom, left, right } = box;
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: top,
                right: right,
                bottom: bottom,
                left: left,
              }}
            ></div>
          );
        })}
      </div>
    )
  );
};

export default FaceRegonition;
