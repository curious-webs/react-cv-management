const logger = param => store => next => action => {
  console.log ('Hi I am in middleware function');
  console.log ('param', param);

  next (action);
};
export default logger;
