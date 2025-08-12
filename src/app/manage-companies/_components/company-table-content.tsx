"use client"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { CompanyTableV2 } from "./company-table-v2";

const TABS = ['annual-report', 'tax-returns', 'budget-forecast', 'board-meetings']

const CompanyTableContent = () => {
    const [value, setValue] = useState(TABS[0]);

    return (
        <Box mt={3}>
            <Box display="flex" gap={0.5} alignItems="center">
                {TABS.map((tab) => (
                    <Button
                        key={tab}
                        onClick={() => setValue(tab)}
                        variant={value === tab ? "contained" : "outlined"}
                        sx={{ textTransform: "none" }}
                    >
                        {tab}
                    </Button>
                ))}
            </Box>

            <CompanyTableV2 />
        </Box>
    )
}

export default CompanyTableContent
