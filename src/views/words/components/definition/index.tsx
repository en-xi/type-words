import { Word, type Definition } from "@/db";
import { memo, useState, type FC, type ReactNode } from "react";
import { DefinitionWrapper } from "./style";

interface IProps {
  children?: ReactNode;
  word: Word;
}

const Definition: FC<IProps> = ({ word }) => {
  const [isShowMoreDefinitions, setIsShowMoreDefinitions] = useState(false);

  function toggleMore() {
    setIsShowMoreDefinitions(!isShowMoreDefinitions);
  }

  return (
    <DefinitionWrapper>
      <div>
        <div className="flex-center">
          <a onClick={toggleMore} className="more">
            {isShowMoreDefinitions ? "collapse" : "more"}
          </a>
        </div>

        <div style={!isShowMoreDefinitions ? {} : { display: "none" }}>
          {word.definition}
        </div>
      </div>

      <div>
        <div></div>

        <dl style={isShowMoreDefinitions ? {} : { display: "none" }}>
          {word.definitions.map((item, index) => {
            return (
              <div key={index}>
                <dt>
                  {index + 1 + " "}
                  <span className="level">{item?.level}</span>
                  {" " + item.definition}
                </dt>
                <dd>{item.examples[0]}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </DefinitionWrapper>
  );
};

export default memo(Definition);
