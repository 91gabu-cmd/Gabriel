import { Composition } from "remotion";
import { SecurityVideo } from "./SecurityVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SecurityGuidelines"
      component={SecurityVideo}
      durationInFrames={1425}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
