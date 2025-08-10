import { Word } from "@/db";
import { SoundFilled, SoundOutlined } from "@ant-design/icons";
import { memo, type FC, type ReactNode } from "react";
import { LabelWrapper } from "./style";

interface IProps {
  children?: ReactNode;
  word: Word;
  play: (src: string) => void;
}

const Label: FC<IProps> = ({ word, play }) => {
  return (
    <LabelWrapper>
      <div></div>
      <div className="main">
        <div>
          <a
            className="sound"
            onClick={() => play(word.audio_uk)}
            title="British pronunciation"
          >
            <SoundOutlined />
          </a>
          {word.phonetic_uk}
        </div>

        <div>{word.name}</div>

        <div>
          <a
            className="sound"
            onClick={() => play(word.audio_us)}
            title="American pronication"
          >
            <SoundFilled />
          </a>
          {word.phonetic_us}
        </div>
      </div>
      <div className="flex-between">
        <div>{word.level}</div>
        <div>{word.part_of_speech}</div>
        <a href={word.url} target="_blank">
          detail
        </a>
      </div>
    </LabelWrapper>
  );
};

export default memo(Label);
