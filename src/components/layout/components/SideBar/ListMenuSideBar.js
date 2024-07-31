import { faCalendarDays, faUser } from "@fortawesome/free-regular-svg-icons";
import listData from "@/dataFake/listBoard";

const {
  faGear,
  faTable,
  faTableList,
  faPlus,
} = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const ListMenuSideBar = [
  {
    items: [
      {
        name: "Bảng",
        leftIcon: <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>,
      },
      {
        name: "Thành viên",
        leftIcon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
        push: true,
      },
      {
        name: "Cài đặt không gian làm việc",
        leftIcon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
        children: [
          {
            title: "Cài đặt không gian làm việc",
          },
          {
            title: "Nâng cấp không gian làm việc",
          },
        ],
      },
    ],
  },
  {
    title: "Dạng xem Không gian làm việc",
    items: [
      {
        name: "Bảng",
        leftIcon: <FontAwesomeIcon icon={faTableList}></FontAwesomeIcon>,
      },
      {
        name: "Lịch",
        leftIcon: <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>,
        push: true,
      },
    ],
  },
  {
    title: "Các bảng của bạn",
    push: <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>,
    // items: [
    //   {
    //     name: "Bảng",
    //     leftIcon: <FontAwesomeIcon icon={faTableList}></FontAwesomeIcon>,
    //   },
    //   {
    //     name: "Lịch",
    //     leftIcon: <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>,
    //     push: <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>,
    //   },
    // ],
    items: listData?.map((item) => {
      return {
        _id: item.board._id,
        name: item.board.title,
        template: item.board.template,
      };
    }),
  },
];

export default ListMenuSideBar;

// (
//   <div className={cx("icon-push")}>
//     <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
//   </div>
// )
