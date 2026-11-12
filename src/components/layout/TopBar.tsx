'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { dlrmsPalette } from '../../theme/palette';
import { UserRole } from '../../types';

export const TopBar: React.FC = () => {
  const {
    language,
    toggleLanguage,
    selectedProvince,
    selectedDistrict,
    selectedTehsil,
    selectedMouza,
    setJurisdiction,
    currentUser,
    setCurrentUserRole,
    toggleSidebar,
    showNotification,
  } = useAppStore();

  const t = translations[language];

  // User Profile Menu
  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorUser(null);

  // Notifications Menu
  const [anchorNotif, setAnchorNotif] = useState<null | HTMLElement>(null);
  const handleOpenNotifMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorNotif(event.currentTarget);
  const handleCloseNotifMenu = () => setAnchorNotif(null);

  // Jurisdiction Dialog
  const [jurisdictionDialogOpen, setJurisdictionDialogOpen] = useState(false);
  const [tempDistrict, setTempDistrict] = useState(selectedDistrict);
  const [tempTehsil, setTempTehsil] = useState(selectedTehsil);
  const [tempMouza, setTempMouza] = useState(selectedMouza);

  const handleSaveJurisdiction = () => {
    setJurisdiction({
      district: tempDistrict,
      tehsil: tempTehsil,
      mouza: tempMouza,
    });
    setJurisdictionDialogOpen(false);
    showNotification(`Jurisdiction updated to: ${tempTehsil}, ${tempDistrict}`, 'info');
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentUserRole(role);
    handleCloseUserMenu();
    showNotification(`Switched role to: ${role}`, 'success');
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: `1px solid ${dlrmsPalette.divider}`, backgroundColor: '#FFFFFF' }}>
      <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: 64, gap: 2 }}>
        {/* Toggle Sidebar Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ color: dlrmsPalette.text.primary }}
        >
          <MenuIcon />
        </IconButton>

        {/* Global Search Bar */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            backgroundColor: '#F1F5F9',
            borderRadius: 2,
            px: 2,
            py: 0.75,
            width: 380,
            border: '1px solid transparent',
            '&:focus-within': {
              borderColor: dlrmsPalette.primary.main,
              backgroundColor: '#FFFFFF',
            },
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder={t.searchPlaceholder}
            sx={{
              fontSize: '0.85rem',
              width: '100%',
              color: 'text.primary',
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Current Revenue Jurisdiction Indicator */}
        <Tooltip title="Click to change active revenue jurisdiction">
          <Button
            size="small"
            variant="outlined"
            onClick={() => setJurisdictionDialogOpen(true)}
            startIcon={<LocationOnIcon sx={{ color: 'primary.main' }} />}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              borderColor: dlrmsPalette.divider,
              color: dlrmsPalette.text.primary,
              backgroundColor: '#F8FAFC',
              fontWeight: 600,
              fontSize: '0.78rem',
              py: 0.6,
              px: 1.5,
              borderRadius: 2,
            }}
          >
            {selectedDistrict} / {selectedTehsil}
          </Button>
        </Tooltip>

        {/* Language Selector: English / اردو */}
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={toggleLanguage}
          startIcon={<LanguageIcon />}
          sx={{
            fontWeight: 700,
            fontSize: '0.8125rem',
            borderRadius: 2,
            px: 1.5,
          }}
        >
          {language === 'en' ? 'اردو (Urdu)' : 'English (انگریزی)'}
        </Button>

        {/* Notifications Icon & Menu */}
        <IconButton color="inherit" onClick={handleOpenNotifMenu} sx={{ color: dlrmsPalette.text.primary }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorNotif}
          open={Boolean(anchorNotif)}
          onClose={handleCloseNotifMenu}
          PaperProps={{ sx: { width: 340, mt: 1.5, p: 1 } }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Revenue Notifications (اطلاعات)
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleCloseNotifMenu} sx={{ py: 1.5, display: 'block' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              New Sale Mutation #INT-4892
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Submitted for Chak 45-RB by Muhammad Ahmed.
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotifMenu} sx={{ py: 1.5, display: 'block' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.main' }}>
              Pending Tehsildar Sanction
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Inheritance case WRST-2024 scheduled for hearing.
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNotifMenu} sx={{ py: 1.5, display: 'block' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Fard Issued #FD-PB-2024-8921
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Verified & printed by Arazi Record Center.
            </Typography>
          </MenuItem>
        </Menu>

        {/* User Profile & Role Switcher */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={handleOpenUserMenu}
            sx={{
              p: 0.5,
              borderRadius: 2,
              textTransform: 'none',
              color: 'text.primary',
              gap: 1,
            }}
          >
            <Avatar sx={{ width: 34, height: 34, backgroundColor: dlrmsPalette.primary.main, fontSize: '0.85rem' }}>
              {currentUser.name.charAt(0)}
            </Avatar>
            <Box sx={{ textAlign: 'left', display: { xs: 'none', md: 'block' } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {currentUser.name}
              </Typography>
              <Chip
                label={currentUser.role}
                size="small"
                color="secondary"
                sx={{ height: 18, fontSize: '0.65rem', fontWeight: 600, mt: 0.2 }}
              />
            </Box>
            <KeyboardArrowDownIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          </Button>

          <Menu
            anchorEl={anchorUser}
            open={Boolean(anchorUser)}
            onClose={handleCloseUserMenu}
            PaperProps={{ sx: { width: 260, mt: 1.5 } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {currentUser.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {currentUser.email}
              </Typography>
              <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, display: 'block' }}>
                {currentUser.jurisdiction}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                Switch Active Role:
              </Typography>
            </Box>
            {(
              [
                'Tehsildar',
                'Super Administrator',
                'Revenue Administrator',
                'Naib Tehsildar',
                'Qanoongo',
                'Patwari',
                'Data Entry Operator',
                'Read-only Auditor',
              ] as UserRole[]
            ).map((role) => (
              <MenuItem
                key={role}
                selected={currentUser.role === role}
                onClick={() => handleRoleChange(role)}
                sx={{ fontSize: '0.8125rem', py: 0.75 }}
              >
                {role}
                {currentUser.role === role && <CheckCircleIcon sx={{ ml: 'auto', fontSize: 16, color: 'primary.main' }} />}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>

      {/* Jurisdiction Selection Modal */}
      <Dialog open={jurisdictionDialogOpen} onClose={() => setJurisdictionDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Select Revenue Jurisdiction</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>District (ضلع)</InputLabel>
            <Select
              value={tempDistrict}
              label="District (ضلع)"
              onChange={(e) => setTempDistrict(e.target.value)}
            >
              <MenuItem value="Lahore">Lahore (ضلع لاہور)</MenuItem>
              <MenuItem value="Kasur">Kasur (ضلع قصور)</MenuItem>
              <MenuItem value="Sheikhupura">Sheikhupura (ضلع شیخوپورہ)</MenuItem>
              <MenuItem value="Rawalpindi">Rawalpindi (ضلع راولپنڈی)</MenuItem>
              <MenuItem value="Faisalabad">Faisalabad (ضلع فیصل آباد)</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Tehsil (تحصیل)</InputLabel>
            <Select
              value={tempTehsil}
              label="Tehsil (تحصیل)"
              onChange={(e) => setTempTehsil(e.target.value)}
            >
              <MenuItem value="Raiwind">Raiwind (تحصیل رائے ونڈ)</MenuItem>
              <MenuItem value="Lahore City">Lahore City (تحصیل سٹی)</MenuItem>
              <MenuItem value="Lahore Cantt">Lahore Cantt (تحصیل کینٹ)</MenuItem>
              <MenuItem value="Model Town">Model Town (تحصیل ماڈل ٹاؤن)</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Mouza (موضع / چک)</InputLabel>
            <Select
              value={tempMouza}
              label="Mouza (موضع / چک)"
              onChange={(e) => setTempMouza(e.target.value)}
            >
              <MenuItem value="Chak 45-RB">Chak 45-RB (چک 45 آر بی)</MenuItem>
              <MenuItem value="Shahpur">Shahpur (موضع شاہ پور)</MenuItem>
              <MenuItem value="Kahna Nau">Kahna Nau (کاہنہ نو)</MenuItem>
              <MenuItem value="Sundar Sharif">Sundar Sharif (سندر شریف)</MenuItem>
              <MenuItem value="Niaz Baig">Niaz Baig (نیاز بیگ)</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setJurisdictionDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveJurisdiction}>
            Set Jurisdiction
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};
