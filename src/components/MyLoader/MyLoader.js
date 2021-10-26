import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './MyLoader.css';

export default function MyLoader() {
  return (
    <div className="myLoader">
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
  );
}
