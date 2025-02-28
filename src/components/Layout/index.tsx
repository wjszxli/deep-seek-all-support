import React, { useMemo, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import MainMenus from "../Left/components/Menus";
import PageTransition from "../PageTransition";
import "./index.scss";

// =========== Type System ===========
type CSSUnit = "px" | "vw" | "vh" | "%" | "rem" | "em";
type CSSValue = number | `${number}${CSSUnit}` | "auto" | string;
type FlexAlignment = "center" | "flex-start" | "flex-end" | "space-between";
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";
type TextAlign = "left" | "center" | "right" | "justify";
type FontWeight = "normal" | "bold" | "lighter" | "bolder" | number;

// =========== Layout Theme ===========
interface LayoutTheme {
  colors: {
    default: string;
    text: string;
    background: string;
  };
  spacing: {
    default: string;
    none: string;
    auto: string;
  };
  typography: {
    fontFamily: string;
    defaultSize: string;
    lineHeight: string;
  };
}

const defaultTheme: LayoutTheme = {
  colors: {
    default: "inherit",
    text: "#fff",
    background: "transparent",
  },
  spacing: {
    default: "0",
    none: "none",
    auto: "auto",
  },
  typography: {
    fontFamily: "Ubuntu",
    defaultSize: "16px",
    lineHeight: "normal",
  },
};

const ThemeContext = createContext<LayoutTheme>(defaultTheme);

// =========== Style Utilities ===========
function formatCSSValue(
  value: CSSValue | undefined,
  defaultValue: string
): string {
  if (value === undefined) return defaultValue;
  if (typeof value === "number") return `${value}px`;
  return value;
}

function createStyleObject(
  props: Record<string, any>,
  theme: LayoutTheme
): React.CSSProperties {
  const styles: Record<string, any> = {};

  // Process dimensions
  styles.width = formatCSSValue(props.width || props.w, theme.spacing.auto);
  styles.height = formatCSSValue(props.height || props.h, theme.spacing.auto);

  // Process colors
  styles.color = props.color || theme.colors.text;
  styles.background = props.background || theme.colors.background;

  // Process positioning
  styles.position = props.position || "static";
  if (props.position !== "static") {
    styles.top = formatCSSValue(props.top, theme.spacing.auto);
    styles.right = formatCSSValue(props.right, theme.spacing.auto);
    styles.bottom = formatCSSValue(props.bottom, theme.spacing.auto);
    styles.left = formatCSSValue(props.left, theme.spacing.auto);
  }

  // Process box properties
  styles.opacity = props.opacity ?? 1;
  styles.borderRadius = formatCSSValue(props.borderRadius, "0");
  styles.boxSizing = "border-box";
  styles.border = props.border || "none";

  // Process flex properties
  if (props.flex !== undefined) {
    styles.flex = props.flex;
  }
  if (props.gap !== undefined) {
    styles.gap = formatCSSValue(props.gap, "0");
  }

  // Process margins
  styles.margin = props.m || props.margin || theme.spacing.default;
  styles.marginTop = formatCSSValue(
    props.mt || props.marginTop,
    theme.spacing.default
  );
  styles.marginRight = formatCSSValue(
    props.mr || props.marginRight,
    theme.spacing.default
  );
  styles.marginBottom = formatCSSValue(
    props.mb || props.marginBottom,
    theme.spacing.default
  );
  styles.marginLeft = formatCSSValue(
    props.ml || props.marginLeft,
    theme.spacing.default
  );

  // Process paddings
  styles.padding = props.p || props.padding || theme.spacing.none;
  styles.paddingTop = formatCSSValue(
    props.pt || props.paddingTop,
    theme.spacing.auto
  );
  styles.paddingRight = formatCSSValue(
    props.pr || props.paddingRight,
    theme.spacing.auto
  );
  styles.paddingBottom = formatCSSValue(
    props.pb || props.paddingBottom,
    theme.spacing.auto
  );
  styles.paddingLeft = formatCSSValue(
    props.pl || props.paddingLeft,
    theme.spacing.auto
  );

  // Merge with passed style object
  return { ...styles, ...(props.style || {}) };
}

// =========== Component Props ===========
export interface BoxProps {
  // Dimensions
  width?: CSSValue;
  height?: CSSValue;
  w?: CSSValue;
  h?: CSSValue;

  // Colors
  color?: string;
  background?: string;

  // Layout
  flex?: string | number;
  position?: Position;
  top?: CSSValue;
  right?: CSSValue;
  bottom?: CSSValue;
  left?: CSSValue;

  // Appearance
  opacity?: number;
  borderRadius?: CSSValue;
  border?: string;
  gap?: CSSValue;

  // Margins
  m?: string;
  margin?: string;
  mt?: CSSValue;
  marginTop?: CSSValue;
  mr?: CSSValue;
  marginRight?: CSSValue;
  mb?: CSSValue;
  marginBottom?: CSSValue;
  ml?: CSSValue;
  marginLeft?: CSSValue;

  // Paddings
  p?: string;
  padding?: string;
  pt?: CSSValue;
  paddingTop?: CSSValue;
  pr?: CSSValue;
  paddingRight?: CSSValue;
  pb?: CSSValue;
  paddingBottom?: CSSValue;
  pl?: CSSValue;
  paddingLeft?: CSSValue;

  // React standard props
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

export interface FlexBoxProps extends BoxProps {
  justifyContent?: FlexAlignment;
  alignItems?: FlexAlignment;
  flexDirection?: FlexDirection;
}

export interface TypographyProps extends BoxProps {
  fontSize?: CSSValue;
  lineHeight?: CSSValue;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  fontFamily?: string;
}

export interface ContainerProps {
  padding?: string;
  className?: string;
  children?: React.ReactNode;
}

// =========== Components ===========
// Base component factory to create components with default props
function createComponent<P extends BoxProps>(
  Component: React.ComponentType<P>,
  defaultProps: Partial<P> = {}
) {
  return React.forwardRef<HTMLElement, P>((props, ref) => {
    const mergedProps = { ...defaultProps, ...props } as P;
    return <Component {...mergedProps} ref={ref as any} />;
  });
}

// Box component - base building block
export const Box: React.FC<BoxProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const styles = useMemo(() => createStyleObject(props, theme), [props, theme]);

  return (
    <div className={className} style={styles} onClick={onClick}>
      {children}
    </div>
  );
};

// FlexBox component - base for all flex layouts
const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  className,
  justifyContent = "flex-start",
  alignItems = "flex-start",
  flexDirection = "row",
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const styles = useMemo(() => {
    const baseStyles = createStyleObject(props, theme);
    return {
      ...baseStyles,
      display: "flex",
      justifyContent,
      alignItems,
      flexDirection,
    };
  }, [props, theme, justifyContent, alignItems, flexDirection]);

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

// Derived flex components using the factory pattern
export const Stack = createComponent(FlexBox);

export const Center = createComponent(FlexBox, {
  justifyContent: "center",
  alignItems: "center",
});

export const HStack = createComponent(FlexBox, {
  flexDirection: "row",
});

export const HSpaceBetweenStack = createComponent(FlexBox, {
  justifyContent: "space-between",
  flexDirection: "row",
});

export const VStack = createComponent(FlexBox, {
  flexDirection: "column",
});

// Typography components
const TextBase: React.FC<TypographyProps> = ({
  children,
  className,
  fontSize,
  lineHeight,
  fontWeight = "normal",
  textAlign = "left",
  fontFamily,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const styles = useMemo(() => {
    const baseStyles = createStyleObject(props, theme);
    return {
      ...baseStyles,
      fontSize: formatCSSValue(fontSize, theme.typography.defaultSize),
      lineHeight: formatCSSValue(lineHeight, theme.typography.lineHeight),
      fontWeight,
      textAlign,
      fontFamily: fontFamily || theme.typography.fontFamily,
    };
  }, [props, theme, fontSize, lineHeight, fontWeight, textAlign, fontFamily]);

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

export const BaseTypography = createComponent(TextBase);

export const TypographyNormal = createComponent(TextBase, {
  fontFamily: "Ubuntu",
  color: "#fff",
});

export const TypographyBold = createComponent(TextBase, {
  fontFamily: "Ubuntu",
  fontWeight: "bold",
  color: "#fff",
});

// Container component
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  padding = "0 18px",
}) => {
  const styles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    flex: 1,
    padding,
  };

  return (
    <main className={className} style={styles}>
      {children}
    </main>
  );
};

// Export types that maintain backward compatibility
export interface ButtonProps extends FlexBoxProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  fontSize?: string;
}

// Export a theme provider for use in applications
export const LayoutThemeProvider: React.FC<{
  theme?: Partial<LayoutTheme>;
  children: React.ReactNode;
}> = ({ theme = {}, children }) => {
  const mergedTheme = useMemo(
    () => ({
      ...defaultTheme,
      ...theme,
      colors: { ...defaultTheme.colors, ...theme.colors },
      spacing: { ...defaultTheme.spacing, ...theme.spacing },
      typography: { ...defaultTheme.typography, ...theme.typography },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="app-layout">
      <div className="app-sidebar">
        <MainMenus />
      </div>
      <div className="app-content">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
};

export default Layout;
