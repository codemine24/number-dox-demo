"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
    IconButton,
    Chip,
    Menu,
    MenuItem,
    TextField,
    InputAdornment,
} from "@mui/material"
import { KeyboardArrowDown, KeyboardArrowUp, AttachFile, MoreVert, FilterList, Search, Clear } from "@mui/icons-material"

interface TableData {
    docType: string
    frequency: string
    description: string
    document: string
    date: string
    endDate: string
    dueDate: string
    reminder: string
    report: string
    lastUpdated: string
}

const sampleData: TableData[] = [
    {
        docType: "Full Accrual",
        frequency: "Annual",
        description: "Annual financial report",
        document: "Draft",
        date: "31/12/2023",
        endDate: "31/12/2023",
        dueDate: "45",
        reminder: "Daily",
        report: "31/12/2023",
        lastUpdated: "31/12/2023",
    },
    {
        docType: "Tax Returns",
        frequency: "Quarterly",
        description: "Q1 tax filing",
        document: "Final",
        date: "31/03/2023",
        endDate: "31/03/2023",
        dueDate: "30",
        reminder: "Weekly",
        report: "15/04/2023",
        lastUpdated: "10/04/2023",
    },
    {
        docType: "Budget Forecast",
        frequency: "Monthly",
        description: "June budget",
        document: "Review",
        date: "01/06/2023",
        endDate: "30/06/2023",
        dueDate: "15",
        reminder: "Monthly",
        report: "15/06/2023",
        lastUpdated: "10/06/2023",
    },
]

const tabs = ["Annual Report", "Tax Returns", "Budget Forecast", "Board Minutes", "Compliance", "SOX", "User Defined"]

interface SortConfig {
    key: keyof TableData
    direction: 'asc' | 'desc'
}

export default function DocumentTable() {
    const [activeTab, setActiveTab] = useState(0)
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)
    const [filters, setFilters] = useState<Partial<TableData>>({})
    const [searchText, setSearchText] = useState('')
    const [filterMenu, setFilterMenu] = useState<{ anchorEl: HTMLElement | null, column: keyof TableData | null }>({ anchorEl: null, column: null })

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    const handleSort = (key: keyof TableData) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>, column: keyof TableData) => {
        setFilterMenu({ anchorEl: event.currentTarget, column })
    }

    const handleFilterClose = () => {
        setFilterMenu({ anchorEl: null, column: null })
    }

    const handleFilterChange = (column: keyof TableData, value: string) => {
        setFilters(prev => ({
            ...prev,
            [column]: value
        }))
    }

    const handleClearFilter = (column: keyof TableData) => {
        const newFilters = { ...filters }
        delete newFilters[column]
        setFilters(newFilters)
    }

    const handleClearAllFilters = () => {
        setFilters({})
        setSearchText('')
    }

    const sortedAndFilteredData = useMemo(() => {
        let filteredData = [...sampleData]

        // Apply search text filter
        if (searchText) {
            filteredData = filteredData.filter(row =>
                Object.values(row).some(val =>
                    String(val).toLowerCase().includes(searchText.toLowerCase())
                )
            )
        }

        // Apply column filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                filteredData = filteredData.filter(row =>
                    String(row[key as keyof TableData]).toLowerCase().includes(String(value).toLowerCase())
                )
            }
        })

        // Apply sorting
        if (sortConfig) {
            filteredData.sort((a, b) => {
                const aValue = a[sortConfig.key]
                const bValue = b[sortConfig.key]

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            })
        }

        return filteredData
    }, [sampleData, sortConfig, filters, searchText])

    const getSortIcon = (key: keyof TableData) => {
        if (!sortConfig || sortConfig.key !== key) return <KeyboardArrowDown fontSize="small" />
        return sortConfig.direction === 'asc'
            ? <KeyboardArrowUp fontSize="small" />
            : <KeyboardArrowDown fontSize="small" />
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <TextField
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: searchText && (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={() => setSearchText('')}>
                                    <Clear fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: 300 }}
                />
                <Button
                    variant="outlined"
                    onClick={handleClearAllFilters}
                    disabled={Object.keys(filters).length === 0 && !searchText}
                >
                    Clear Filters
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={1}>
                <Table sx={{ minWidth: 1200 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            {Object.keys(sampleData[0]).map((key) => (
                                <TableCell key={key} sx={{
                                    whiteSpace: 'nowrap',
                                    width: '1%', // This makes the cell shrink to fit content
                                    py: 1 // Reduce padding to make more compact
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        {key.split(/(?=[A-Z])/).join(' ')}
                                        <IconButton
                                            size="small"
                                            onClick={() => handleSort(key as keyof TableData)}
                                            sx={{ p: 0 }}
                                        >
                                            {getSortIcon(key as keyof TableData)}
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleFilterClick(e, key as keyof TableData)}
                                            sx={{ p: 0 }}
                                        >
                                            <FilterList fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedAndFilteredData.map((row, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{row.docType}</TableCell>
                                <TableCell>{row.frequency}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Button variant="outlined" size="small" startIcon={<AttachFile />} sx={{ textTransform: "none" }}>
                                            Attach
                                        </Button>
                                        <Chip label={row.document} size="small" color="default" variant="outlined" />
                                    </Box>
                                </TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.endDate}</TableCell>
                                <TableCell>{row.dueDate}</TableCell>
                                <TableCell>{row.reminder}</TableCell>
                                <TableCell>{row.report}</TableCell>
                                <TableCell>{row.lastUpdated}</TableCell>
                                <TableCell>
                                    <IconButton size="small">
                                        <MoreVert />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Filter Menu */}
            <Menu
                anchorEl={filterMenu.anchorEl}
                open={Boolean(filterMenu.anchorEl)}
                onClose={handleFilterClose}
            >
                {filterMenu.column && (
                    <Box sx={{ p: 2, minWidth: 200 }}>
                        <TextField
                            label={`Filter by ${filterMenu.column}`}
                            value={filters[filterMenu.column] || ''}
                            onChange={(e) => handleFilterChange(filterMenu.column!, e.target.value)}
                            fullWidth
                            size="small"
                            InputProps={{
                                endAdornment: filters[filterMenu.column] && (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={() => handleClearFilter(filterMenu.column!)}>
                                            <Clear fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                )}
            </Menu>
        </Box>
    )
}