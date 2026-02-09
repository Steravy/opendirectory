import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

interface NavbarConfig {
    /** Exact paths where navbar should be hidden */
    hiddenPaths?: string[];
    /** Regex patterns for dynamic routes (e.g., /admin/*) */
    hiddenPatterns?: RegExp[];
    /** Paths that start with these strings */
    hiddenPathStartsWith?: string[];
    /** Paths that should always show navbar (overrides others) */
    excludedPaths?: string[];
}

const defaultConfig: NavbarConfig = {
    hiddenPaths: ['/login', '/signup', '/admin'],
    hiddenPatterns: [/^\/admin\/.*$/], // Matches /admin/dashboard, /admin/users, etc.
    hiddenPathStartsWith: ['/admin/'], // Alternative to regex pattern
    excludedPaths: [], // Paths that should always show navbar
};

export const shouldShowNavbar = (
    pathname: string,
    config: NavbarConfig = {}
): boolean => {
    // Merge with default config
    const mergedConfig: NavbarConfig = {
        ...defaultConfig,
        ...config,
        hiddenPaths: [...(defaultConfig.hiddenPaths || []), ...(config.hiddenPaths || [])],
        hiddenPatterns: [...(defaultConfig.hiddenPatterns || []), ...(config.hiddenPatterns || [])],
        hiddenPathStartsWith: [...(defaultConfig.hiddenPathStartsWith || []), ...(config.hiddenPathStartsWith || [])],
        excludedPaths: [...(defaultConfig.excludedPaths || []), ...(config.excludedPaths || [])],
    };

    const {
        hiddenPaths = [],
        hiddenPatterns = [],
        hiddenPathStartsWith = [],
        excludedPaths = [],
    } = mergedConfig;

    // Check if path is explicitly excluded (always show)
    if (excludedPaths.includes(pathname)) {
        return true;
    }

    // Check exact paths
    if (hiddenPaths.includes(pathname)) {
        return false;
    }

    // Check regex patterns
    if (hiddenPatterns.some(pattern => pattern.test(pathname))) {
        return false;
    }

    // Check paths that start with certain strings
    if (hiddenPathStartsWith.some(prefix => pathname.startsWith(prefix))) {
        return false;
    }

    return true;
};

// Hook version using the utility function
export const useShouldShowNavbar = (customConfig?: Partial<NavbarConfig>): boolean => {
    const location = useLocation();
    const { pathname } = location;

    return useMemo(
        () => shouldShowNavbar(pathname, customConfig),
        [pathname, customConfig]
    );
};