const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

const PAT = process.env.CLARIFAI_KEY;
if (!PAT) {
  console.error('CLARIFAI_KEY environment variable is not set');
  process.exit(1);
}

const metadata = new grpc.Metadata();
metadata.set('authorization', 'Key ' + PAT);
const stub = ClarifaiStub.grpc();

//!Model info
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const detectFace = inputs => {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID,
        inputs: inputs,
      },
      metadata,
      (err, response) => {
        if (err) {
          console.error('gRPC error:', err);
          return reject(new Error(err));
        }

        if (response.status.code !== 10000) {
          console.error('Response error:', response.status);
          return reject(
            new Error(
              'Post model outputs failed, status: ' +
                response.status.description
            )
          );
        }

        const results = response.outputs[0].data.regions.map(region => {
          const boundingBox = region.region_info.bounding_box;

          return {
            boundingBox: {
              topRow: boundingBox.top_row.toFixed(3),
              leftCol: boundingBox.left_col.toFixed(3),
              bottomRow: boundingBox.bottom_row.toFixed(3),
              rightCol: boundingBox.right_col.toFixed(3),
            },
          };
        });

        resolve(results);
      }
    );
  });
};

const handleDetect = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).send({ error: 'imageUrl is required' });
    }

    const inputs = [
      {
        data: {
          image: {
            url: imageUrl,
          },
        },
      },
    ];

    const results = await detectFace(inputs);
    return res.send({ results });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = {
  handleDetect,
};
