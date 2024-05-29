import { NavLink } from "react-router-dom";

interface NavLinksProps {
  closeMobileMenu: () => void;
}

export type NavBarRoutes = {
    title: string;
    path: string;
  };

const NavLinks: React.FC<NavLinksProps> = ({ closeMobileMenu }) => {
//   const active = "md:my-0 my-7 text-xl font-bold text-custom-color3";
//   const inActive =
//     "md:my-0 my-7 text-xl text-custom-color3 hover:border-b hover:border-custom-color3";
    
    const navBarRoutes = [
        {
          title: "About",
          path: "/about",
        },
        {
          title: "Contact",
          path: "/contact",
        },
      ];
    
  return (
    <>
      {navBarRoutes.map((item: NavBarRoutes, index: number) => (
        <NavLink key={index} to={item.path} onClick={closeMobileMenu}>
          <li className="my-2 sm:mt-0">
            <div className="flex text-xl items-center text-black hover:text-custom-color3">
              {item?.title}
            </div>
          </li>
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;
