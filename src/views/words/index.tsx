import "@/db/index";
import useWordStore from "@/store";
import { useEffect, useRef, useState } from "react";

import type { CollapseProps, RadioChangeEvent, SelectProps } from "antd";
import { Collapse, Pagination, Radio, Select, Spin } from "antd";
import Definition from "./components/definition";
import Label from "./components/label";
import { WordsWrapper } from "./style";

const options: SelectProps["options"] = [
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "B1", value: "B1" },
  { label: "B2", value: "B2" },
  { label: "C1", value: "C1" },
];

function Words() {
  let { words, select, total } = useWordStore();
  const [levels, setLevels] = useState<string[]>(["A1", "A2"]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [is3000, setIs3000] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleLevelsChange = (value: string[]) => {
    console.log(`selected ${value}`);
    let pageNumber = 1;
    select(value, pageNumber, pageSize, is3000);
    setPage(pageNumber);
    setLevels(value);
  };

  useEffect(() => {
    if (words.length !== 0) {
      setIsLoading(false);
    }
  }, [words]);

  useEffect(() => {
    select(levels, page, pageSize, is3000);
    console.log("mount");
  }, []);

  function paginationOnChange(page: number, pageSize: number) {
    console.log(page, pageSize);
    select(levels, page, pageSize, is3000);
    setPage(page);
    setPageSize(pageSize);
  }

  function showItems() {
    let items: CollapseProps["items"] = [];

    words.forEach((word) =>
      items.push({
        key: word.id,
        label: <Label word={word} play={play} />,
        children: <Definition word={word} />,
        showArrow: true,
      })
    );

    return items;
  }

  function play(src: string) {
    console.log("src: ", src);
    audioRef.current!.src = src;
    audioRef.current!.play();
  }

  const numberOnChange = (e: RadioChangeEvent) => {
    let value = e.target.value;
    setIs3000(value);
    select(levels, page, pageSize, value);
  };

  return (
    <WordsWrapper>
      <div className="condition">
        <div className="flex ">
          levels:{" "}
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={levels}
            onChange={handleLevelsChange}
            options={options}
          />
        </div>
        <div>
          number:{" "}
          <Radio.Group
            onChange={numberOnChange}
            value={is3000}
            options={[
              { value: 1, label: "3000" },
              { value: 2, label: "5000" },
              { value: 0, label: "5000 excluding 3000" },
            ]}
          />
        </div>
      </div>
      <div className="flex-end pagination ">
        <Pagination
          onChange={paginationOnChange}
          showTotal={(total) => `total: ${total}`}
          current={page}
          pageSize={pageSize}
          total={total}
          showSizeChanger
        />
      </div>

      {isLoading ? (
        <Spin tip="loading...">
          <div></div>
        </Spin>
      ) : (
        <Collapse items={showItems()} collapsible="icon" accordion />
      )}

      <div className="flex-end pagination">
        <Pagination
          onChange={paginationOnChange}
          showTotal={(total) => `total: ${total}`}
          current={page}
          pageSize={pageSize}
          total={total}
          showSizeChanger
        />
      </div>

      <audio ref={audioRef}></audio>
    </WordsWrapper>
  );
}

export default Words;
