import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { NavigationMenu, SkipNavigationLink } from '../';

import styles from './Header.module.scss';
let cx = classNames.bind(styles);

export default function Header({ className, menuItems }) {
  const [isNavShown, setIsNavShown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const menuRef = useRef(null);
  const router = useRouter();

  // Classes with scroll-aware styles
  const headerClasses = cx('header', className, { scrolled: isScrolled });
  const logoWrapClasses = cx('logo-wrap', { scrolled: isScrolled });
  const headerContentClasses = cx('container', 'header-content', {
    scrolled: isScrolled,
  });

  const navClasses = cx(
    'primary-navigation',
    isNavShown ? cx('show') : undefined
  );

  const closeNavigation = () => {
    setIsNavShown(false);
    setExpandedItems([]);
  };

  const toggleNavigation = () => {
    setIsNavShown((current) => {
      const next = !current;

      if (!next) {
        setExpandedItems([]);
      }

      return next;
    });
  };

  const toggleExpandedItem = (itemId) => {
    setExpandedItems((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]
    );
  };

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeNavigation();
  }, [router.asPath]);

  useEffect(() => {
    if (!isNavShown) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeNavigation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNavShown]);

  // Handle submenu overflow flipping
  useEffect(() => {
    const items = menuRef.current?.querySelectorAll('li') || [];
    const cleanups = [];

    items.forEach((li) => {
      const submenu = li.querySelector('ul ul'); // 3rd-level menu
      if (!submenu) return;

      const handleEnter = () => {
        const rect = submenu.getBoundingClientRect();
        const overflowsRight = rect.right > window.innerWidth;

        if (overflowsRight) {
          submenu.style.left = 'auto';
          submenu.style.right = '100%';
        } else {
          submenu.style.left = '100%';
          submenu.style.right = 'auto';
        }
      };

      li.addEventListener('mouseenter', handleEnter);
      li.addEventListener('focusin', handleEnter);
      cleanups.push(() => {
        li.removeEventListener('mouseenter', handleEnter);
        li.removeEventListener('focusin', handleEnter);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [menuItems]);

  return (
    <header className={headerClasses}>
      <div className={logoWrapClasses}>
        <div className="container">
          <div className={cx('logo')}>
            <Link legacyBehavior href="/">
              <a title="Home">
                <Image
                  src="/logo.png"
                  width={400}
                  height={80}
                  alt="Cal Poly University logo"
                  layout="responsive"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <SkipNavigationLink />

      <div className={headerContentClasses}>
        <div className={cx('bar')}>
          <Link href="/" className={cx('titleName')}>
            Cal Poly Partners
          </Link>

          <div className={cx('header-actions')}>
            <Link legacyBehavior href="/search">
              <a
                className={cx('search-link')}
                aria-label="Search the site"
                onClick={closeNavigation}
              >
                <FaSearch title="Search" role="img" />
              </a>
            </Link>

            <button
              type="button"
              className={cx('nav-toggle')}
              onClick={toggleNavigation}
              aria-label={isNavShown ? 'Close navigation' : 'Open navigation'}
              aria-controls="primary-navigation"
              aria-expanded={isNavShown}
            >
              {isNavShown ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <button
            type="button"
            className={cx('nav-backdrop', { show: isNavShown })}
            aria-label="Close navigation"
            tabIndex={isNavShown ? 0 : -1}
            onClick={closeNavigation}
          />

          <NavigationMenu
            id="primary-navigation"
            className={navClasses}
            menuItems={menuItems}
            ref={menuRef}
            onNavigate={closeNavigation}
            expandedItems={expandedItems}
            onToggleItem={toggleExpandedItem}
          >
            <li className="mobile-search-link">
              <Link href="/search" onClick={closeNavigation}>
                Search
              </Link>
            </li>
          </NavigationMenu>

          {isNavShown ? (
            <button
              type="button"
              className={cx('mobile-close')}
              aria-label="Close navigation"
              onClick={closeNavigation}
            >
              <FaTimes aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
