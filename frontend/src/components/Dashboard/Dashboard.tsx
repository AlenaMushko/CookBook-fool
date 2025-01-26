import { useGetDishCategoriesQuery } from "@apis/dishAPI";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { useAppStore } from "@stores/zustandStore";
import { groupCategories } from "@utils/groupCategories";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

import theme from "../../../theme";

const Dashboard = () => {
  const { t } = useTranslation();
  const { setDishCategory, dishCategory } = useAppStore();

  const { data: dishCategories } = useGetDishCategoriesQuery();
  const dishCategoriesData = dishCategories?.data || [];
  const groupedCategories = groupCategories(dishCategoriesData);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSubCategoryClick = (subcategory: {
    id: string;
    name: string;
  }) => {
    if (subcategory.id !== dishCategory?.id) {
      setDishCategory(subcategory);
    }
  };

  const handleCategoryClick = (category: { id: string; name: string }) => {
    if (category.id !== dishCategory?.id) {
      console.log("category", category);
      setDishCategory(category);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        position: "relative",
        paddingTop: " 55px ",
      }}
    >
      <aside
        style={{
          width: isCollapsed ? "60px" : "250px",
          transition: "width 0.3s ease",
          background: theme.palette.gradients?.green,
          padding: isCollapsed ? " 20px 10px 10px 10px " : "20px",
          boxShadow: theme.palette.shadow?.green,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          sx={{
            zIndex: 1300,
            minWidth: "auto",
            width: isCollapsed ? "40px" : "100%",
            height: "40px",
            borderRadius: isCollapsed ? "50%" : "8px",
            marginBottom: "12px",
            backgroundColor: theme.palette.secondary.main,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          {isCollapsed ? (
            <UnfoldMoreIcon sx={{ transform: "rotate(90deg)" }} />
          ) : (
            <UnfoldLessIcon sx={{ transform: "rotate(90deg)" }} />
          )}
        </Button>

        {!isCollapsed &&
          Object.keys(groupedCategories).map((mainCategory) => {
            const { id, subCategories } = groupedCategories[mainCategory];
            const hasSubCategories = subCategories.length > 0;

            if (!hasSubCategories) {
              return (
                <Button
                  key={mainCategory}
                  fullWidth
                  onClick={() =>
                    handleCategoryClick({
                      id,
                      name: mainCategory,
                    })
                  }
                  variant='greenButton'
                  sx={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {t(`categories.${mainCategory}`, mainCategory)}
                </Button>
              );
            }

            return (
              <Accordion
                key={mainCategory}
                expanded={expanded === mainCategory}
                onChange={handleChange(mainCategory)}
                sx={{
                  marginBottom: "12px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${mainCategory}-content`}
                  id={`${mainCategory}-header`}
                  sx={{
                    justifyContent: "flex-start",
                    backgroundColor: theme.palette.colors?.greenBtnBg,
                    marginBottom: 0,
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    fontFamily: "Montserrat, Arial, sans-serif",
                    fontWeight: "700",
                    fontSize: "18px",
                    color: theme.palette.colors?.greyText,
                    textTransform: "none",
                    "&.Mui-expanded": {
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: "4px 4px 0 0",
                      color: theme.palette.primary.contrastText,
                      fontWeight: "700",
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.colors?.greenBtnHoverBg,
                      color: theme.palette.colors?.greyText,
                    },
                  }}
                >
                  {t(`categories.${mainCategory}`, mainCategory)}
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: "8px 16px",
                    background: theme.palette.gradients?.green,
                  }}
                >
                  {subCategories.map((subcategory) => (
                    <Button
                      key={subcategory.id}
                      fullWidth
                      onClick={() =>
                        handleSubCategoryClick({
                          id: subcategory.id,
                          name: t(
                            `categories.${mainCategory}-${subcategory.name}`,
                            subcategory.name
                          ),
                        })
                      }
                      variant='greenButton'
                    >
                      {t(
                        `categories.${mainCategory}-${subcategory.name}`,
                        subcategory.name
                      )}
                    </Button>
                  ))}
                </AccordionDetails>
              </Accordion>
            );
          })}
      </aside>
      <main style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
