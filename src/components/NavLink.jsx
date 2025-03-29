'use client';

const NavLink = ({ name, path }) => {
  return (
    <li>
      <a
        href={path}
        className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
      >
        {name}
      </a>
    </li>
  );
};

export default NavLink;