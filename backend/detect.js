const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');
const dotenv = require('dotenv');

dotenv.config();

const metadata = new grpc.Metadata();
metadata.set('authorization', `Key ${process.env.CLARIFAI_KEY}`);

const stub = ClarifaiStub.grpc();

const detectFace = inputs => {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
        model_id: 'a403429f2ddf4b49b307e318f00e528b',
        inputs: inputs,
      },
      metadata,
      (error, response) => {
        if (error) {
          reject('Error: ' + error);
          return;
        }

        if (response.status.code !== 10000) {
          reject(
            'Received failed status: ' +
              response.status.description +
              '\n' +
              response.status.details
          );
          return;
        }

        let results = response.outputs[0].data.regions;
        resolve(results);
      }
    );
  });
};

const handleDetect = async (req, res) => {
  try {
    const { imageUrl } = req.body;
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
    return res.send({
      results,
    });
  } catch (error) {
    return res.status(400).send({
      error: error,
    });
  }
};

module.exports = {
  handleDetect,
};
