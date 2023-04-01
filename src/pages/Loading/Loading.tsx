import "./Loading.css";

interface Props {
  className: string;
  text: string;
}

const Loading = (props: Props) => {
  return (
    <div
      className={`${props.className} fixed z-[2] top-0 left-0 flex flex-col h-screen w-screen bg-stone-800`}
    >
      <div className="mx-auto my-auto z-0">
        <div className="loader"></div>
        <p className="text-center font-bold">{props.text}</p>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  text: "",
  className: "",
};

export default Loading;
