import axios from "axios";

//put firebase database link here
const firebaseDatabse = "......"
export const addServiceProvider = (serviceProvider) => {
  axios.post(
    firebaseDatabse + "/ServiceProviders.json",
    serviceProvider
  );
};

export const addEmployer = (employer) => {
  axios.post(
    firebaseDatabse + "/Employers.json",
    employer
  );
};

export const updateEmployer = (id, employer) => {
  axios.put(
    firebaseDatabse + "/Employers/" +
    id +
    ".json",
    employer
  );
};

export const updateServiceProvider = (id, ServiceProvider) => {
  axios.put(
    firebaseDatabse + "/ServiceProviders/" +
    id +
    ".json",
    ServiceProvider
  );
};

export const fetchAllServiceProviders = async () => {
  const response = await axios.get(
    firebaseDatabse + "/ServiceProviders.json"
  );
  const serviceProviders = [];

  for (const key in response.data) {
    const serviceProviderObj = {
      id: key,
      firstName: response.data[key].firstName,
      lastName: response.data[key].lastName,
      address: response.data[key].address,
      photoUrl: response.data[key].photoUrl,
      phoneNumber: response.data[key].phoneNumber,
      profession: response.data[key].profession,
      shortBio: response.data[key].shortBio,
      email: response.data[key].email,
      password: response.data[key].password,
    };
    serviceProviders.push(serviceProviderObj);
  }

  return serviceProviders;
};

export const fetchAllEmployers = async () => {
  const response = await axios.get(
    firebaseDatabse + "/Employers.json"
  );
  const Employers = [];

  for (const key in response.data) {
    const EmployersObj = {
      id: key,
      firstName: response.data[key].firstName,
      lastName: response.data[key].lastName,
      address: response.data[key].address,
      photoUrl: response.data[key].photoUrl,
      phoneNumber: response.data[key].phoneNumber,
      email: response.data[key].email,
      password: response.data[key].password,
    };

    Employers.push(EmployersObj);
  }

  return Employers;
};
