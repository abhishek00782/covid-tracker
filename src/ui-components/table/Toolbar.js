import { Flex } from "reflexbox";
import { Button } from "../button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import debounce from "lodash.debounce";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ToolbarContext } from "./context";
import { FiltersContainer } from "./styles";

export function Toolbar({ instance, actions, className }) {
  const appliedFilters = useMemo(
    () => new Set((instance.filter || []).map((f) => f.id)),
    [instance.filter]
  );
  const partition = useCallback(
    (array) => {
      return array.reduce(
        ([pass, fail], elem) => {
          return appliedFilters.has(elem.id)
            ? [[...pass, elem], fail]
            : [pass, [...fail, elem]];
        },
        [[], []]
      );
    },
    [appliedFilters]
  );

  const ref = useRef(null);
  const cols = instance.allColumns
    .filter((it) => it.hasFilter)
    .sort((a, b) => (a.filterOrder || 0) - (b.filterOrder || 0));
  const [filteredCols, unfilteredCols] = partition(cols);
  console.log(filteredCols, unfilteredCols, "filteredCols");

  const [visibleFilters, setVisibleFilters] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextNavNeeded = ref.current
    ? ref.current?.children.length - 1 > visibleFilters
    : false;
  const prevNavNeeded = ref.current ? ref.current.scrollLeft !== 0 : false;

  const calculateVisibleFilters = useCallback(
    () =>
      debounce((v = 0) => {
        if (ref.current) {
          setVisibleFilters(Math.min(v + 1, ref.current.children.length));
        }
      }, 100),
    []
  );

  const resetScrollPosition = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
      });
      const filters = ref.current.children;
      let width = 0;
      let n;
      for (n = 0; n < filters.length; n += 1) {
        width = width + filters[n].clientWidth + 8;
        if (width > ref.current.clientWidth) {
          break;
        }
      }
      setVisibleFilters(n - 1);
    }
  }, []);

  useEffect(() => {
    resetScrollPosition();
  }, [resetScrollPosition]);

  useEffect(() => {
    const root = ref.current;
    const fn = () => {
      calculateVisibleFilters(visibleFilters);
    };
    if (root) {
      root.addEventListener("scroll", fn);
    }
    return () => {
      if (root) {
        root.removeEventListener("scroll", fn);
      }
    };
  }, [calculateVisibleFilters, visibleFilters]);

  return (
    <ToolbarContext.Provider
      value={{
        isExpanded,
        expand: () => setIsExpanded(true),
        collapse: () => setIsExpanded(false),
      }}
    >
      <Flex
        width="100%"
        className={`toolbar ${className}`}
        height={isExpanded ? 400 : "auto"}
        style={{ position: "absolute" }}
      >
        <FiltersContainer ref={ref}>
          {filteredCols.map((col) => col.render("Filter"))}
          {unfilteredCols.map((col) => col.render("Filter"))}
        </FiltersContainer>
        <Flex
          style={{
            boxShadow: "0px -3px 4px 0px rgba(170, 170, 170, 0.5)",
            zIndex: 1,
          }}
          height={60}
          alignItems="center"
          minWidth={492}
          flexGrow={1}
        >
          <Button
            clear
            ml="8px"
            onClick={resetScrollPosition}
            disabled={!prevNavNeeded}
          >
            <MdChevronLeft size={18} />
          </Button>
          <Button
            clear
            ml="8px"
            onClick={() => {
              if (ref.current) {
                const el = ref.current.children[visibleFilters + 1];
                try {
                  ref.current.scrollTo({
                    left:
                      el.offsetLeft +
                      el.clientWidth -
                      ref.current.clientWidth +
                      8,
                    top: 0,
                    behavior: "smooth",
                  });
                } catch (err) {
                  //
                }
              }
            }}
            disabled={!nextNavNeeded}
          >
            <MdChevronRight size={18} />
          </Button>
          <Button
            ml="8px"
            outline
            onClick={() => {
              resetScrollPosition();
              instance.onFilterChange(instance.state.filters);
            }}
          >
            Apply
          </Button>
          <Button
            ml={16}
            clear
            onClick={() => {
              resetScrollPosition();
              instance.onFilterChange([]);
            }}
          >
            Reset
          </Button>
          <Flex ml="auto">{actions}</Flex>
        </Flex>
      </Flex>
    </ToolbarContext.Provider>
  );
}
