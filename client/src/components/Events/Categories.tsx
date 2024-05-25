const Categories = ({
    id,
    category,
    onClick,
  }: {
    id: number;
    category: string;
    onClick: (id: number, category: string) => void;
  }) => {
    return (
      <div
        className="shadow-sm bg-custom-color1 rounded-xl py-2 px-3 cursor-pointer w-[120px] text-center font-semibold hover:text-custom-color3"
        onClick={() => onClick(id, category)}
      >
        <h2>{category}</h2>
      </div>
    );
  };
  
  export default Categories;
  