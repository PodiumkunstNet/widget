import LogoSvg from '../LogoSvg';

const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-primary-orange px-6 ">
      <div className="block animate-pulse">
        <LogoSvg />
      </div>
    </div>
  );
};

export default Loader;
