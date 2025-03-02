import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  fetchUserStats,
  updateUserRole,
} from "../../store/Slices/AuthSlice";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Chip,
  Stack,
  Pagination as MUIPagination,
  Select,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  PersonAdd,
  TrendingUp,
  Group,
  Search,
  Delete,
  FilterList,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AvailableUserRoles } from "../../helpers/constants";

export const UsersDashboard = () => {
  const dispatch = useDispatch();
  const {
    users,
    totalUsers,
    currentPage,
    totalPages,
    limit,
    isLoading,
    userStats,
  } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    role: "",
  });

  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [selectedUserForRoleChange, setSelectedUserForRoleChange] =
    useState(null);
  const [newRole, setNewRole] = useState("");
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllUsers(filters));
    dispatch(fetchUserStats("7d"));
  }, [dispatch, filters]);

  // Sort users when the users array or role filter changes
  useEffect(() => {
    if (!users || users.length === 0) {
      setSortedUsers([]);
      return;
    }

    // Clone the users array to avoid mutating the state
    const usersCopy = [...users];

    if (filters.role === "") {
      // If no specific role is selected, use the original order
      setSortedUsers(usersCopy);
    } else {
      // Sort users so that those matching the selected role appear at the top
      usersCopy.sort((a, b) => {
        if (a.role === filters.role && b.role !== filters.role) return -1;
        if (a.role !== filters.role && b.role === filters.role) return 1;
        return 0;
      });
      setSortedUsers(usersCopy);
    }
  }, [users, filters.role]);

  const handlePageChange = (_, newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    setSelectedUserForRoleChange(userId);
    setNewRole(newRole);
  };

  const confirmRoleChange = async () => {
    if (selectedUserForRoleChange && newRole) {
      setUpdatingUserId(selectedUserForRoleChange);
      try {
        await dispatch(
          updateUserRole({
            userId: selectedUserForRoleChange,
            role: newRole,
          })
        ).unwrap();

        // Refresh users list after successful update
        dispatch(getAllUsers(filters));
      } catch (error) {
        console.error("Role update failed:", error);
      } finally {
        setUpdatingUserId(null);
        setSelectedUserForRoleChange(null);
        setNewRole("");
      }
    }
  };

  const tableColumns = ["User", "Email", "Role", "Joined", "Actions"];

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Role Change Confirmation Dialog */}
      <Dialog
        open={Boolean(selectedUserForRoleChange)}
        onClose={() => setSelectedUserForRoleChange(null)}
      >
        <DialogTitle>Confirm Role Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to change this user's role to ${newRole}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedUserForRoleChange(null)}>
            Cancel
          </Button>
          <Button
            onClick={confirmRoleChange}
            color="primary"
            variant="contained"
            disabled={updatingUserId !== null}
          >
            {updatingUserId ? <CircularProgress size={24} /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            User Management
          </Typography>
          <Typography color="text.secondary">
            Monitor and manage your platform users
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          sx={{ bgcolor: "#1976d2" }}
        >
          Add New User
        </Button>
      </Box>

      {/* Stats Cards */}
      {userStats && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary" variant="subtitle2">
                  Total Users
                </Typography>
                <Group />
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {userStats.totalUsers}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUp
                  sx={{ color: "success.main", fontSize: "1rem", mr: 0.5 }}
                />
                <Typography variant="caption" color="success.main">
                  12% from last period
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {userStats.roleDistribution &&
            userStats.roleDistribution.map(({ role, count }) => (
              <Grid item xs={12} md={4} key={role}>
                <Paper sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography color="text.secondary" variant="subtitle2">
                      {role}s
                    </Typography>
                    <Group />
                  </Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {count}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUp
                      sx={{ color: "success.main", fontSize: "1rem", mr: 0.5 }}
                    />
                    <Typography variant="caption" color="success.main">
                      8% from last period
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
        </Grid>
      )}

      {/* Growth Chart */}
      {userStats && userStats.recentGrowth && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            User Growth
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={userStats.recentGrowth}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#1976d2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      )}

      {/* Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          InputProps={{
            startAdornment: <Search sx={{ color: "text.secondary", mr: 1 }} />,
          }}
        />
        <TextField
          select
          value={filters.role}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, role: e.target.value }))
          }
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <FilterList sx={{ color: "text.secondary", mr: 1 }} />
            ),
          }}
        >
          <MenuItem value="">All Roles</MenuItem>
          {AvailableUserRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : sortedUsers && sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <TableRow
                  key={user._id}
                  hover
                  sx={{
                    bgcolor:
                      filters.role && user.role === filters.role
                        ? "rgba(25, 118, 210, 0.08)"
                        : "inherit",
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={user.avatar || `/api/placeholder/40/40`}
                        sx={{ mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle2">
                          {user.name || "User Name"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{user.username || "username"}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email || "user@example.com"}</TableCell>
                  <TableCell>
                    {updatingUserId === user._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Chip
                        label={user.role}
                        color={user.role === "ADMIN" ? "primary" : "default"}
                        onClick={() => handleRoleChange(user._id, user.role)}
                        sx={{ cursor: "pointer" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString() ||
                      "Jan 15, 2024"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      size="small"
                      disabled={updatingUserId !== null}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MUIPagination
          count={totalPages || 5}
          page={currentPage || filters.page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default UsersDashboard;
