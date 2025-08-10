import "@/db/index";
import useWordStore from "@/store";
import { useEffect, useRef, useState } from "react";

import { type Word } from "@/db/index";
import { SettingOutlined } from "@ant-design/icons";
import type { RadioChangeEvent, SelectProps } from "antd";
import { Modal, Pagination, Radio, Select, Switch } from "antd";
import Word2 from "./components/word";
import { TypeWrapper } from "./style";

const options: SelectProps["options"] = [
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "B1", value: "B1" },
  { label: "B2", value: "B2" },
  { label: "C1", value: "C1" },
];

function Type() {
  let { words, select, total } = useWordStore();
  const [levels, setLevels] = useState<string[]>(["A1", "A2"]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [is3000, setIs3000] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingShow, setIsSettingShow] = useState(true);
  const [isUKPron, setIsUKPron] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    select(levels, page, pageSize, is3000);
  }, []);

  const handleLevelsChange = (value: string[]) => {
    console.log(`selected ${value}`);
    let pageNumber = 1;
    select(value, pageNumber, pageSize, is3000);
    setPage(pageNumber);
    setLevels(value);
  };

  function nextPage() {
    paginationOnChange(page + 1, pageSize);
  }

  function paginationOnChange(page: number, pageSize: number) {
    console.log(page, pageSize);
    select(levels, page, pageSize, is3000);
    setPage(page);
    setPageSize(pageSize);
  }

  const numberOnChange = (e: RadioChangeEvent) => {
    let value = e.target.value;
    setIs3000(value);
    select(levels, page, pageSize, value);
  };

  function settingClick() {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function switchChange(checked: boolean) {
    setDisabled(checked);
  }

  function switchChange2(checked: boolean) {
    setIsSettingShow(checked);
  }

  function play(src?: string, word?: Word) {
    console.log(src, word, isUKPron);
    let src2 = "";
    if (src) src2 = src;
    if (word) src2 = isUKPron ? word.audio_uk : word.audio_us;

    console.log("src: ", src2);
    audioRef.current!.src = src2;
    audioRef.current!.play();
  }

  function pronChange(e: any) {
    setIsUKPron(e.target.value);
  }

  return (
    <TypeWrapper>
      <div className="setting">
        {isSettingShow ? (
          <div>
            <div className="condition">
              <div className="flex-between level">
                <div className="flex select">
                  levels:{" "}
                  <Select
                    disabled={disabled}
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={levels}
                    onChange={handleLevelsChange}
                    options={options}
                  />
                </div>
                <SettingOutlined onClick={settingClick} />
              </div>

              <div>
                number:{" "}
                <Radio.Group
                  disabled={disabled}
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
                disabled={disabled}
                onChange={paginationOnChange}
                showTotal={(total) => `total: ${total}`}
                current={page}
                pageSize={pageSize}
                total={total}
                showSizeChanger={{
                  options: [
                    { value: "20", label: <span>20</span> },
                    { value: "50", label: <span>50</span> },
                    { value: "100", label: <span>100</span> },
                  ],
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex-end level">
            <SettingOutlined onClick={settingClick} />
          </div>
        )}
      </div>

      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="modal">
          <div>
            <span> disabled </span>

            <Switch value={disabled} onChange={switchChange} />
          </div>
          <div>
            show setting{" "}
            <Switch value={isSettingShow} onChange={switchChange2} />
          </div>
          <div>
            pronunciation{" "}
            <Radio.Group
              onChange={pronChange}
              value={isUKPron}
              options={[
                { value: true, label: "UK" },
                { value: false, label: "US" },
              ]}
            />
          </div>
        </div>
      </Modal>

      <div className="main flex-center">
        <Word2
          words={words}
          nextPage={nextPage}
          play={play}
          isUKPron={isUKPron}
        />
      </div>

      <audio ref={audioRef}></audio>
    </TypeWrapper>
  );
}

export default Type;
