import classNames from "classnames/bind";
import style from "./BoardBar.module.scss";
import Button from "@/components/Button";
import Menu from "@/components/Popper/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faTableCellsLarge,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

const cx = classNames.bind(style);

function BoardBar({ onClick, data }) {
  console.log(data);

  return (
    <div className={cx("boardbar")}>
      <div className={cx("left-boardbar")}>
        <Button className={cx("Title-table")}>{data?.board?.title}</Button>
        <Menu listItem={data?.board?.columns}>
          <Button
            leftIcon={
              <FontAwesomeIcon icon={faTableCellsLarge}></FontAwesomeIcon>
            }
            rightIcon={<FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>}
            className={cx("listBoard")}
          >
            Bảng
          </Button>
        </Menu>
      </div>
      <div className={cx("right-boardbar")}>
        <Button
          onClick={onClick}
          className={cx("icon-invite")}
          leftIcon={<FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>}
        >
          Invite
        </Button>
        <div className={cx("list-avatar")}>
          <div className={cx("avatar")}>
            <img
              src="https://lh3.googleusercontent.com/fife/ALs6j_E78JEtiynjU-EZ0jWqsBVbEDYArVtY7-16wju_pzweYz7cHftTrZLwa3EHrCaTk0wYjTxnb-xzEDncofxD3WFIAMt-8H1UZpYh3GM8-l7CfiUHUkUb44NZn-pwE7zmiaBv-RLenAIUk_EWu6gqQHr1noxYrvD3hVwXD88tCNXoyM0nzwv8E3oTuiB6A0dqn7aQPKv_cc7_f9NEzA5yyasizs_kZGbnmzLLSjdizMLMgJNVM8CpWHlmNwzG2iJSN_BefORaEt71VOUOKBW3WZrKqc-g1F8BiZBM0Sn0ivjWvD_HrEMc23SrT9vqnEoTJ9yBmsUSKyuIs59Mbni2YmODp5oejzrZWLo_znLNyMjM_j_pZyfjYpk4hHaiS2tLp4QvQtDoPD-inNYR6cN9KYPSu1eGB8kiOSlViziYb_9yac7o-GWugNgYL5Ebzr-Zv4uP5fyQw-OsbzIty7gKuSLneyRY6-WCuVnYLKs7RLwBRzN23hbBcEYa1_oh63RoZE3eGua0sO-8qQHYC1gCYNFtZI9Y0KV1Tsyl-CzeU9qIbjeed0UzL_f-DMEcRb3f03MaSlALijfyxgkO5vjDK9_SbMpK-ClxdGikmUnqpfAnRrKs4By1rUXdHx0tBGWGcyQFvuefPEotsdITXEoUReOfKKAMJxg69YICaRF-YLtaWIdrYwpJzyREQvAE-c6GZwBRlpPaqrY7tQe2UhIt-KiadsuurW3r5BRWrammh3l5BkOprXpyLqe1sokxzjlabubGhrUN26VjMXKtEUWBV8XsB1c1L3XxOUHlYwG7GyQStoJsxPjIbapToIZfSk5kETX5G0GXonIY3v3GxzAZwje36wDVt1JEZYaGax4uGiN5IsCSMmfiYQ-bdjwM1HT6R-gBlzgYUI0P3R2400PCdCqG2DWI7W4bQetcUtbKqro1TvRcJkfrgYwQFK7bCwGN4XQafJAh-1MYj7lxKBJ6VKXqovf-Tkbg2AySnn7K6YL165uofPGEisO4AGBl-3vs7KJgYXu6g_nFa7qJEza7iVL0oeK35Y8DS9W_p8PVzYpbnoi9OhcpClDvGmUSjS7RPpgye1w-JUb9t9yuNQwaHrQMi5YZNK83iVcTNnp0nLfqn1syh7HafZIq7wGYdbCiRUDnrxGkKGxUJRE7k_-7VzmTZ2nCGMjuKEa07Yk1RBWIy6XkvWCvwkub8Ob5buUL4DzrBVeiqcaGRSbT-1B_kcFR8kLAMWUItuGHdYhWNcvUImfx1DI4eCZUZZu3_wOogkVzPEshGajc15pahSV01TtKAsW5jo7cRynL_A-l8hr-Y_RgRT04azmVyqzEWEISfC3hW7dTsTPznmYSyzYjTPWUA_NoDfpmdRdqHhVBaGJzJpXEJdhhKqzTPcHIARXu7GGYeBVWAUoMQyqSZMIBvX0_MKmIGlc_1Q=s32-c"
              alt=""
            />
          </div>
          <div className={cx("avatar")}>
            <img
              src="https://lh3.googleusercontent.com/fife/ALs6j_E78JEtiynjU-EZ0jWqsBVbEDYArVtY7-16wju_pzweYz7cHftTrZLwa3EHrCaTk0wYjTxnb-xzEDncofxD3WFIAMt-8H1UZpYh3GM8-l7CfiUHUkUb44NZn-pwE7zmiaBv-RLenAIUk_EWu6gqQHr1noxYrvD3hVwXD88tCNXoyM0nzwv8E3oTuiB6A0dqn7aQPKv_cc7_f9NEzA5yyasizs_kZGbnmzLLSjdizMLMgJNVM8CpWHlmNwzG2iJSN_BefORaEt71VOUOKBW3WZrKqc-g1F8BiZBM0Sn0ivjWvD_HrEMc23SrT9vqnEoTJ9yBmsUSKyuIs59Mbni2YmODp5oejzrZWLo_znLNyMjM_j_pZyfjYpk4hHaiS2tLp4QvQtDoPD-inNYR6cN9KYPSu1eGB8kiOSlViziYb_9yac7o-GWugNgYL5Ebzr-Zv4uP5fyQw-OsbzIty7gKuSLneyRY6-WCuVnYLKs7RLwBRzN23hbBcEYa1_oh63RoZE3eGua0sO-8qQHYC1gCYNFtZI9Y0KV1Tsyl-CzeU9qIbjeed0UzL_f-DMEcRb3f03MaSlALijfyxgkO5vjDK9_SbMpK-ClxdGikmUnqpfAnRrKs4By1rUXdHx0tBGWGcyQFvuefPEotsdITXEoUReOfKKAMJxg69YICaRF-YLtaWIdrYwpJzyREQvAE-c6GZwBRlpPaqrY7tQe2UhIt-KiadsuurW3r5BRWrammh3l5BkOprXpyLqe1sokxzjlabubGhrUN26VjMXKtEUWBV8XsB1c1L3XxOUHlYwG7GyQStoJsxPjIbapToIZfSk5kETX5G0GXonIY3v3GxzAZwje36wDVt1JEZYaGax4uGiN5IsCSMmfiYQ-bdjwM1HT6R-gBlzgYUI0P3R2400PCdCqG2DWI7W4bQetcUtbKqro1TvRcJkfrgYwQFK7bCwGN4XQafJAh-1MYj7lxKBJ6VKXqovf-Tkbg2AySnn7K6YL165uofPGEisO4AGBl-3vs7KJgYXu6g_nFa7qJEza7iVL0oeK35Y8DS9W_p8PVzYpbnoi9OhcpClDvGmUSjS7RPpgye1w-JUb9t9yuNQwaHrQMi5YZNK83iVcTNnp0nLfqn1syh7HafZIq7wGYdbCiRUDnrxGkKGxUJRE7k_-7VzmTZ2nCGMjuKEa07Yk1RBWIy6XkvWCvwkub8Ob5buUL4DzrBVeiqcaGRSbT-1B_kcFR8kLAMWUItuGHdYhWNcvUImfx1DI4eCZUZZu3_wOogkVzPEshGajc15pahSV01TtKAsW5jo7cRynL_A-l8hr-Y_RgRT04azmVyqzEWEISfC3hW7dTsTPznmYSyzYjTPWUA_NoDfpmdRdqHhVBaGJzJpXEJdhhKqzTPcHIARXu7GGYeBVWAUoMQyqSZMIBvX0_MKmIGlc_1Q=s32-c"
              alt=""
            />
          </div>
          <div className={cx("avatar")}>
            <img
              src="https://lh3.googleusercontent.com/fife/ALs6j_E78JEtiynjU-EZ0jWqsBVbEDYArVtY7-16wju_pzweYz7cHftTrZLwa3EHrCaTk0wYjTxnb-xzEDncofxD3WFIAMt-8H1UZpYh3GM8-l7CfiUHUkUb44NZn-pwE7zmiaBv-RLenAIUk_EWu6gqQHr1noxYrvD3hVwXD88tCNXoyM0nzwv8E3oTuiB6A0dqn7aQPKv_cc7_f9NEzA5yyasizs_kZGbnmzLLSjdizMLMgJNVM8CpWHlmNwzG2iJSN_BefORaEt71VOUOKBW3WZrKqc-g1F8BiZBM0Sn0ivjWvD_HrEMc23SrT9vqnEoTJ9yBmsUSKyuIs59Mbni2YmODp5oejzrZWLo_znLNyMjM_j_pZyfjYpk4hHaiS2tLp4QvQtDoPD-inNYR6cN9KYPSu1eGB8kiOSlViziYb_9yac7o-GWugNgYL5Ebzr-Zv4uP5fyQw-OsbzIty7gKuSLneyRY6-WCuVnYLKs7RLwBRzN23hbBcEYa1_oh63RoZE3eGua0sO-8qQHYC1gCYNFtZI9Y0KV1Tsyl-CzeU9qIbjeed0UzL_f-DMEcRb3f03MaSlALijfyxgkO5vjDK9_SbMpK-ClxdGikmUnqpfAnRrKs4By1rUXdHx0tBGWGcyQFvuefPEotsdITXEoUReOfKKAMJxg69YICaRF-YLtaWIdrYwpJzyREQvAE-c6GZwBRlpPaqrY7tQe2UhIt-KiadsuurW3r5BRWrammh3l5BkOprXpyLqe1sokxzjlabubGhrUN26VjMXKtEUWBV8XsB1c1L3XxOUHlYwG7GyQStoJsxPjIbapToIZfSk5kETX5G0GXonIY3v3GxzAZwje36wDVt1JEZYaGax4uGiN5IsCSMmfiYQ-bdjwM1HT6R-gBlzgYUI0P3R2400PCdCqG2DWI7W4bQetcUtbKqro1TvRcJkfrgYwQFK7bCwGN4XQafJAh-1MYj7lxKBJ6VKXqovf-Tkbg2AySnn7K6YL165uofPGEisO4AGBl-3vs7KJgYXu6g_nFa7qJEza7iVL0oeK35Y8DS9W_p8PVzYpbnoi9OhcpClDvGmUSjS7RPpgye1w-JUb9t9yuNQwaHrQMi5YZNK83iVcTNnp0nLfqn1syh7HafZIq7wGYdbCiRUDnrxGkKGxUJRE7k_-7VzmTZ2nCGMjuKEa07Yk1RBWIy6XkvWCvwkub8Ob5buUL4DzrBVeiqcaGRSbT-1B_kcFR8kLAMWUItuGHdYhWNcvUImfx1DI4eCZUZZu3_wOogkVzPEshGajc15pahSV01TtKAsW5jo7cRynL_A-l8hr-Y_RgRT04azmVyqzEWEISfC3hW7dTsTPznmYSyzYjTPWUA_NoDfpmdRdqHhVBaGJzJpXEJdhhKqzTPcHIARXu7GGYeBVWAUoMQyqSZMIBvX0_MKmIGlc_1Q=s32-c"
              alt=""
            />
          </div>
          <div className={cx("avatar")}>
            <img
              src="https://lh3.googleusercontent.com/fife/ALs6j_E78JEtiynjU-EZ0jWqsBVbEDYArVtY7-16wju_pzweYz7cHftTrZLwa3EHrCaTk0wYjTxnb-xzEDncofxD3WFIAMt-8H1UZpYh3GM8-l7CfiUHUkUb44NZn-pwE7zmiaBv-RLenAIUk_EWu6gqQHr1noxYrvD3hVwXD88tCNXoyM0nzwv8E3oTuiB6A0dqn7aQPKv_cc7_f9NEzA5yyasizs_kZGbnmzLLSjdizMLMgJNVM8CpWHlmNwzG2iJSN_BefORaEt71VOUOKBW3WZrKqc-g1F8BiZBM0Sn0ivjWvD_HrEMc23SrT9vqnEoTJ9yBmsUSKyuIs59Mbni2YmODp5oejzrZWLo_znLNyMjM_j_pZyfjYpk4hHaiS2tLp4QvQtDoPD-inNYR6cN9KYPSu1eGB8kiOSlViziYb_9yac7o-GWugNgYL5Ebzr-Zv4uP5fyQw-OsbzIty7gKuSLneyRY6-WCuVnYLKs7RLwBRzN23hbBcEYa1_oh63RoZE3eGua0sO-8qQHYC1gCYNFtZI9Y0KV1Tsyl-CzeU9qIbjeed0UzL_f-DMEcRb3f03MaSlALijfyxgkO5vjDK9_SbMpK-ClxdGikmUnqpfAnRrKs4By1rUXdHx0tBGWGcyQFvuefPEotsdITXEoUReOfKKAMJxg69YICaRF-YLtaWIdrYwpJzyREQvAE-c6GZwBRlpPaqrY7tQe2UhIt-KiadsuurW3r5BRWrammh3l5BkOprXpyLqe1sokxzjlabubGhrUN26VjMXKtEUWBV8XsB1c1L3XxOUHlYwG7GyQStoJsxPjIbapToIZfSk5kETX5G0GXonIY3v3GxzAZwje36wDVt1JEZYaGax4uGiN5IsCSMmfiYQ-bdjwM1HT6R-gBlzgYUI0P3R2400PCdCqG2DWI7W4bQetcUtbKqro1TvRcJkfrgYwQFK7bCwGN4XQafJAh-1MYj7lxKBJ6VKXqovf-Tkbg2AySnn7K6YL165uofPGEisO4AGBl-3vs7KJgYXu6g_nFa7qJEza7iVL0oeK35Y8DS9W_p8PVzYpbnoi9OhcpClDvGmUSjS7RPpgye1w-JUb9t9yuNQwaHrQMi5YZNK83iVcTNnp0nLfqn1syh7HafZIq7wGYdbCiRUDnrxGkKGxUJRE7k_-7VzmTZ2nCGMjuKEa07Yk1RBWIy6XkvWCvwkub8Ob5buUL4DzrBVeiqcaGRSbT-1B_kcFR8kLAMWUItuGHdYhWNcvUImfx1DI4eCZUZZu3_wOogkVzPEshGajc15pahSV01TtKAsW5jo7cRynL_A-l8hr-Y_RgRT04azmVyqzEWEISfC3hW7dTsTPznmYSyzYjTPWUA_NoDfpmdRdqHhVBaGJzJpXEJdhhKqzTPcHIARXu7GGYeBVWAUoMQyqSZMIBvX0_MKmIGlc_1Q=s32-c"
              alt=""
            />
          </div>{" "}
          <div className={cx("avatar")}>+6</div>
        </div>
      </div>
    </div>
  );
}

export default memo(BoardBar);
