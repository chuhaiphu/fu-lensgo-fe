import { useCallback, useEffect, useState, useMemo } from "react";
import { Button } from "../../atoms/button/Button";
import { PieChart } from "../../molecules/chart/pie-chart/PieChart";
import { EyeOutlined } from "@ant-design/icons";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { Select } from "antd";
import React from 'react'
import CustomizedCard from "../../molecules/card/Card";
import "./index.scss";

const HomeTemplate = () => {
  const [remainDate, setRemainDate] = useState(3);
  const [loading, setLoading] = useState(false);
  const [goodRate, setGoodRate] = useState(80);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [topic, setTopic] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");

  // Use debounce to delay the filter action and avoid multiple renders



  useEffect(() => {
  }, [selectedStatus]);

  return (
    <div className="pt-6 pb-10 h-full w-full flex gap-6">
      <div className="w-1/4 h-full gap-6 flex flex-col">
        <div className="h-1/3">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/green-blue-abstract.svg')"
            styleClass="border-none"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="text-white gap-2 flex flex-col">
                <span className="text-xs-medium">
                  Buổi hẹn tiếp theo sẽ bắt đầu vào
                </span>
                <h3 className="text-xl-extra-bold">{remainDate} ngày nữa</h3>
              </div>
              <div className="flex justify-end">
                <Button
                  size="xs"
                  styleClass="bg-shade-900 text-white"
                  fontSize="xs"
                >
                  Xem lịch ngay
                </Button>
              </div>

            </div>
          </CustomizedCard>
        </div>
        <div className="h-2/3">
          <CustomizedCard
            loading={loading}
            styleClass="bg-gradient-to-b from-[#151316] to-[#4D4252] border-none"
          >
            <div className="h-full w-full">
              <div className="text-white flex justify-between items-center">
                <span className="text-xs-medium">
                  Tỉ lệ phản hồi tích cực từ sinh viên (%)
                </span>
                <Button
                  styleClass="bg-[#FFFFFF30] rounded-[12px] h-[43px] w-[43px] flex justify-center items-center"
                  status="none"
                >
                  <EyeOutlined />
                </Button>
              </div>
              <PieChart
                data={[
                  {
                    id: "bad",
                    label: "Phần còn lại",
                    value: 100 - goodRate,
                  },
                  {
                    id: "good",
                    label: "Phản hồi tốt",
                    value: goodRate,
                  },
                ]}
              ></PieChart>
            </div>
          </CustomizedCard>
        </div>
      </div>
      <div className="w-3/4 h-full gap-6 flex flex-col">
        <div className="h-[calc(50%-12px)]">
          <CustomizedCard
            loading={loading}
            styleClass="border border-shade-800 border-1"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm-medium">Danh sách đề tài</h3>
              <Button
                size="xs"
                styleClass="bg-gradient-to-r from-[#151316] to-[#4D4252] text-white"
                fontSize="xs"
                onClick={() => setIsModalVisible(true)}
              >
                Thêm đề tài mới +
              </Button>
            </div>
            <ul className="space-y-4 overflow-y-scroll h-4/5 topic-list">
              <li className="topic-item">
                <span className="index">1</span>
                <div className="content">
                  <span className="title">Bộ sưu tập thu đông</span>
                </div>
                <span className="actions">

                  <Button
                  size="xxs"
                  fontSize="xs"
                  styleClass="asset"
                  >
                    Xem chi tiết
                  </Button>
                </span>
              </li>
            </ul>
          </CustomizedCard>
        </div>
        <div className="h-[calc(50%-12px)]">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/blue-abstract-v2.svg')"
            styleClass="border-none"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm-medium text-white">Lịch sử yêu cầu thêm đề tài</h3>
              <Select
                defaultValue=""
                style={{ width: 120 }}
                options={[
                  { value: "", label: "Tất cả" },
                  { value: "PENDING", label: "Pending" },
                  { value: "ACCEPTED", label: "Accepted" },
                  { value: "REJECTED", label: "Rejected" },
                  { value: "ACTIVE", label: "Active" },
                  { value: "INACTIVE", label: "Inactive" },
                ]}
              />
            </div>

          </CustomizedCard>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
