import Button from "../Button";

function PopperItem({ listMenu }) {
  return (
    <>
      {listMenu.map((item, index) => {
        return <Button key={index}>{item}</Button>;
      })}
    </>
  );
}

export default PopperItem;
