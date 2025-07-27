import { gql } from '@apollo/client';
import Link from 'next/link';

export default function NavigationMenu({ menuItems, className, children }) {
  if (!menuItems) {
    return null;
  }

  // Convert flat list to a tree structure
  const buildMenuTree = (items) => {
    const map = {};
    const roots = [];

    items.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });

    items.forEach((item) => {
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    return roots;
  };

  const renderMenuItems = (items) => {
    return items.map((item) => (
      <li key={item.id ?? ''}>
        <Link href={item.path ?? ''}>{item.label ?? ''}</Link>
        {item.children?.length > 0 && (
          <ul>
            {renderMenuItems(item.children)}
          </ul>
        )}
      </li>
    ));
  };

  const menuTree = buildMenuTree(menuItems);

  return (
    <nav
      className={className}
      role="navigation"
      aria-label={`${menuItems[0]?.menu?.node?.name ?? 'Main'} menu`}
    >
      <ul className="menu">
        {renderMenuItems(menuTree)}
        {children}
      </ul>
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
