const parameter = {
    parameter: {
      billCodes: 'JS1320967817',
      lang: 'id'      
    }
  };

  const data = `method=order.massOrderTrack&data=${JSON.stringify(parameter)}&format=json&v=1.0`;
  console.log(encodeURI(data))