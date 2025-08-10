import { memo, type FC, type ReactNode } from "react";
import { AboutWrapper } from "./style";

interface IProps {
  children?: ReactNode;
}

const About: FC<IProps> = () => {
  return (
    <AboutWrapper>
      <p>
        People can remember words on the site by using muscle memory formed by
        repeatedly typing English words on a keyboard.
      </p>
      <p>
        Some people will type faster than English when typing in their native
        language, because many years of native language input has trained a very
        strong muscle memory, while English input muscle memory is relatively
        weak, prone to "pick up the pen and forget the word" phenomenon, through
        repeated practice on this website can solve this problem.
      </p>
      <p>The six levels are grouped into three broad categories: </p>
      <p>
        A1-A2 (Basic User): Can understand and use basic phrases and
        expressions, can communicate in simple situations.{" "}
      </p>
      <p>
        B1-B2 (Independent User): Can understand the main points of clear
        standard input on familiar matters regularly encountered in work,
        school, leisure, etc., can deal with most situations likely to arise
        whilst traveling in an area where the language is spoken, can produce
        simple connected text on topics that are familiar or of personal
        interest.{" "}
      </p>
      <p>
        C1-C2 (Proficient User): Can understand a wide range of demanding,
        longer texts, and recognize implicit meaning, can express him/herself
        fluently and spontaneously without much obvious searching for
        expressions, can use language flexibly and effectively for social,
        academic and professional purposes.{" "}
      </p>
    </AboutWrapper>
  );
};

export default memo(About);
