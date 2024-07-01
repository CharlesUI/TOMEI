//ReactPackages
import BarLoader from "react-spinners/BarLoader";

export const useReactLoader = () => {

  const loadSpinner = () => {
      return <BarLoader color="#36d7b7" />;
  };

  return { loadSpinner }
};
