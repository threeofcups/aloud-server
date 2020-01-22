// library routes
const libRouter = (req, res) => {
  console.log('quiet in the library please.')
  res.send('easy listening!');
}
module.exports = libRouter;