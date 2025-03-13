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
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Snackbar,
  Alert,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const { users, totalUsers, currentPage, totalPages, isLoading, userStats } =
    useSelector((state) => state.auth);

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

  // Fetch users and stats when filters change
  useEffect(() => {
    dispatch(getAllUsers(filters))
      .unwrap()
      .catch((error) => {
        console.error("Error fetching users:", error);
        setAlertInfo({
          open: true,
          message: "Failed to fetch users. Please try again later.",
          severity: "error",
        });
      });

    dispatch(fetchUserStats("7d"))
      .unwrap()
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setAlertInfo({
          open: true,
          message: "Failed to fetch user statistics.",
          severity: "error",
        });
      });
  }, [dispatch, filters]);

  // Sort users based on role filter
  useEffect(() => {
    if (!users || users.length === 0) {
      setSortedUsers([]);
      return;
    }

    const usersCopy = [...users];

    if (filters.role === "") {
      setSortedUsers(usersCopy);
    } else {
      usersCopy.sort((a, b) => {
        if (a.role === filters.role && b.role !== filters.role) return -1;
        if (a.role !== filters.role && b.role === filters.role) return 1;
        return 0;
      });
      setSortedUsers(usersCopy);
    }
  }, [users, filters.role]);

  // Handle pagination change
  const handlePageChange = (_, newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Handle role change initiation
  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    setSelectedUserForRoleChange(userId);
    setNewRole(newRole);
  };

  // Confirm role change
  const confirmRoleChange = async () => {
    if (selectedUserForRoleChange && newRole) {
      setUpdatingUserId(selectedUserForRoleChange);
      try {
        const result = await dispatch(
          updateUserRole({
            userId: selectedUserForRoleChange,
            role: newRole,
          })
        ).unwrap();

        if (result) {
          setAlertInfo({
            open: true,
            message: `User role updated to ${newRole} successfully.`,
            severity: "success",
          });
          dispatch(getAllUsers(filters));
        }
      } catch (error) {
        console.error("Role update failed:", error);
        setAlertInfo({
          open: true,
          message: "Failed to update user role. Please try again.",
          severity: "error",
        });
      } finally {
        setUpdatingUserId(null);
        setSelectedUserForRoleChange(null);
        setNewRole("");
      }
    }
  };

  // Close alert
  const handleCloseAlert = () => {
    setAlertInfo((prev) => ({ ...prev, open: false }));
  };

  // Table columns for desktop and mobile
  const tableColumns = ["User", "Email", "Role", "Joined", "Actions"];
  const mobileTableColumns = ["User", "Role", "Actions"];

  // Render mobile user card
  const renderMobileUserCard = (user) => (
    <Card key={user._id} sx={{ mb: 2, position: "relative" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={
              user.avatar?.url &&
              user.avatar.url !== "https://via.placeholder.com/200x200.png"
                ? user.avatar.url
                : "/images/avatar-placeholder.png"
            }
            sx={{ mr: 2 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/avatar-placeholder.png";
            }}
          />
          <Box>
            <Typography variant="subtitle1">
              {user.name || "User Name"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.username || "username"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Email:
          </Typography>
          <Typography variant="body2">
            {user.email || "user@example.com"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Joined:
          </Typography>
          <Typography variant="body2">
            {new Date(user.createdAt).toLocaleDateString() || "Jan 15, 2024"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Role:
          </Typography>
          {updatingUserId === user._id ? (
            <CircularProgress size={24} />
          ) : (
            <Chip
              label={user.role}
              color={user.role === "ADMIN" ? "primary" : "default"}
              onClick={() => handleRoleChange(user._id, user.role)}
              size="small"
              sx={{ cursor: "pointer" }}
            />
          )}
        </Box>

        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <IconButton
            color="error"
            size="small"
            disabled={updatingUserId !== null}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Snackbar for alerts */}
      <Snackbar
        open={alertInfo.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertInfo.severity}
          sx={{ width: "100%" }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>

      {/* Role change confirmation dialog */}
      <Dialog
        open={Boolean(selectedUserForRoleChange)}
        onClose={() => setSelectedUserForRoleChange(null)}
        fullWidth={isMobile}
        maxWidth="xs"
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

      {/* Header section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 0 } }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ fontWeight: "bold" }}
          >
            User Management
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            color="text.secondary"
          >
            Monitor and manage your platform users
          </Typography>
        </Box>
      </Box>

      {/* Stats cards */}
      {userStats && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  color="text.secondary"
                  variant={isMobile ? "subtitle2" : "subtitle1"}
                >
                  Total Users
                </Typography>
                <Group fontSize={isMobile ? "small" : "medium"} />
              </Box>
              <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 1 }}>
                {userStats.totalUsers || 0}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUp
                  sx={{
                    color: "success.main",
                    fontSize: isMobile ? "0.8rem" : "1rem",
                    mr: 0.5,
                  }}
                />
                <Typography variant="caption" color="success.main">
                  12% from last period
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {userStats.roleDistribution &&
            userStats.roleDistribution.map(({ role, count }) => (
              <Grid item xs={12} sm={6} md={4} key={role}>
                <Paper sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      color="text.secondary"
                      variant={isMobile ? "subtitle2" : "subtitle1"}
                    >
                      {role}s
                    </Typography>
                    <Group fontSize={isMobile ? "small" : "medium"} />
                  </Box>
                  <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 1 }}>
                    {count}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUp
                      sx={{
                        color: "success.main",
                        fontSize: isMobile ? "0.8rem" : "1rem",
                        mr: 0.5,
                      }}
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

      {/* User growth chart */}
      {userStats && userStats.recentGrowth && (
        <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ mb: 2 }}>
            User Growth
          </Typography>
          <Box sx={{ height: isMobile ? 200 : 300 }}>
            <ResponsiveContainer>
              <BarChart data={userStats.recentGrowth}>
                <XAxis dataKey="date" tick={{ fontSize: isMobile ? 10 : 12 }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
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
          size={isMobile ? "small" : "medium"}
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          InputProps={{
            startAdornment: (
              <Search
                sx={{
                  color: "text.secondary",
                  mr: 1,
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              />
            ),
          }}
        />
        <TextField
          select
          size={isMobile ? "small" : "medium"}
          value={filters.role}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, role: e.target.value }))
          }
          sx={{ minWidth: { xs: "100%", sm: 200 } }}
          InputProps={{
            startAdornment: (
              <FilterList
                sx={{
                  color: "text.secondary",
                  mr: 1,
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              />
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

      {/* Users list */}
      {isMobile ? (
        <Box sx={{ mb: 3 }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : sortedUsers && sortedUsers.length > 0 ? (
            sortedUsers.map((user) => renderMobileUserCard(user))
          ) : (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography>No users found</Typography>
            </Paper>
          )}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {(isTablet ? mobileTableColumns : tableColumns).map(
                  (column) => (
                    <TableCell key={column}>{column}</TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={isTablet ? 3 : 5} align="center">
                    <CircularProgress />
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
                          src={
                            user.avatar?.url &&
                            user.avatar.url !==
                              "https://via.placeholder.com/200x200.png"
                              ? user.avatar.url
                              : "/images/avatar-placeholder.png"
                          }
                          sx={{ mr: 2, width: 40, height: 40 }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/avatar-placeholder.png";
                          }}
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
                    {!isTablet && (
                      <TableCell>{user.email || "user@example.com"}</TableCell>
                    )}
                    <TableCell>
                      {updatingUserId === user._id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <Chip
                          label={user.role}
                          color={user.role === "ADMIN" ? "primary" : "default"}
                          onClick={() => handleRoleChange(user._id, user.role)}
                          sx={{ cursor: "pointer" }}
                          size={isTablet ? "small" : "medium"}
                        />
                      )}
                    </TableCell>
                    {!isTablet && (
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString() ||
                          "Jan 15, 2024"}
                      </TableCell>
                    )}
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
                  <TableCell colSpan={isTablet ? 3 : 5} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MUIPagination
          count={totalPages || 5}
          page={currentPage || filters.page}
          onChange={handlePageChange}
          color="primary"
          size={isMobile ? "small" : "medium"}
        />
      </Box>
    </Box>
  );
};

export default UsersDashboard;
