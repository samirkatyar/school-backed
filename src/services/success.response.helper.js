function successResponse(successCode, data, description, statusCode = 200) {
  return {
    successCode,
    data,
    description,
    statusCode,
  };
}

function createdSuccessfully({ data, description }) {
  return successResponse('CREATED_SUCCESSFULLY', data, description);
}

function deletedSuccessfully({ data, description }) {
  return successResponse('DELETED_SUCCESSFULLY', data, description);
}

function updatedSuccessfully({ data, description }) {
  return successResponse('UPDATED_SUCCESSFULLY', data, description);
}

function fetchedSuccessfully({ data, description }) {
  return successResponse('FETCHED_SUCCESSFULLY', data, description);
}

module.exports = {
  createdSuccessfully,
  deletedSuccessfully,
  updatedSuccessfully,
  fetchedSuccessfully,
  successResponse,
};
