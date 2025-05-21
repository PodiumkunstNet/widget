import { Logo } from "../../../components/Logo";
import { ariaLabels } from "../../../constants/ariaLables";

const EmptyPreview = () => {
  return (
    <div className="container h-[444px] w-[900px] border border-solid border-primary-orange">
      <div className="flex h-full flex-col items-center justify-center">
        <Logo
          aria-hidden={true}
          aria-label={ariaLabels.logo}
          dark={true}
          large={true}
        />
        <div className="pt-10 text-center  text-primary-black">
          Voer specifieke identifier in om te starten.
        </div>
      </div>
    </div>
  );
};

export default EmptyPreview;
