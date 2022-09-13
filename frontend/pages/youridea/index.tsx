import { DefaultLayout } from "@layouts/DefaultLayout";

const YourIdea: IPageComponent = ({}) => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden">
      <iframe
        className="absolute w-full h-full"
        src="https://docs.google.com/forms/d/e/1FAIpQLScbIdWacV9EgXq0ByU8LbJYnGAZjGlxrJK4yHZMbX2i9qTg4g/viewform?embedded=true"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
      >
        Đang tải…
      </iframe>
    </div>
  );
};

export default YourIdea;
