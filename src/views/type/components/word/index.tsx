import { type Word } from "@/db";
import { Spin } from "antd";
import {
  memo,
  useEffect,
  useLayoutEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { WordWrap } from "./style";

interface IProps {
  children?: ReactNode;
  words: Word[];
  nextPage: () => void;
  play: any;
  isUKPron: boolean;
}

let wordIndex = 0;
let regex = /[a-zA-Z]{1}/;

const Word: FC<IProps> = ({ words, nextPage, play, isUKPron }) => {
  const [word, setWord] = useState<Word>();
  const [typedString, setTypedString] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (words.length !== 0) {
      wordIndex = 0;
      resetWord(words[0]);
      setIsLoading(false);
    }
  }, [words]);

  useLayoutEffect(() => {
    if (typedString) {
      handleTypedString();
    }
  }, [typedString]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      let key = e.key;
      if (key.length === 1 && regex.test(key)) {
        setTypedString((prev) => prev + key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleTypedString() {
    if (!word!.name.startsWith(typedString)) {
      play(word);
      setTypedString("");
      return;
    }
    if (word?.name.length === typedString.length) {
      if (wordIndex < words.length - 1) {
        resetWord(words[++wordIndex]);
      } else {
        nextPage();
      }
    }
  }

  function resetWord(word: Word) {
    play(word);
    setWord(word);
    setTypedString("");
  }

  if (isLoading) {
    return (
      <Spin tip="loading...">
        <div></div>
      </Spin>
    );
  }

  return (
    <WordWrap>
      <div>
        <div className="word flex-center">
          <span className="typedString">{typedString}</span>
          {word?.name.slice(typedString.length)}
        </div>

        <div className="flex-center">
          {isUKPron ? (
            <span>BrE: {word?.phonetic_uk}</span>
          ) : (
            <span>AmE: {word?.phonetic_us}</span>
          )}
        </div>

        <div className="definition">{word?.definition}</div>
        <br />
        <div>{word?.example}</div>
      </div>
    </WordWrap>
  );
};

export default memo(Word);
