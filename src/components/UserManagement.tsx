import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Shield, Mail, Phone, Calendar, Settings, Eye, UserCheck } from 'lucide-react';
import { useAuth, User, Permission } from '../contexts/AuthContext';

interface UserManagementProps {
  language: 'tr' | 'en';
}

const UserManagement: React.FC<UserManagementProps> = ({ language }) => {
  const { users, user: currentUser, updateUser, deleteUser, register, hasPermission } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'roles' | 'permissions'>('list');

  const texts = {
    tr: {
      userManagement: 'Kullanıcı Yönetimi',
      addUser: 'Yeni Kullanıcı Ekle',
      editUser: 'Kullanıcıyı Düzenle',
      deleteUser: 'Kullanıcıyı Sil',
      userList: 'Kullanıcı Listesi',
      roleManagement: 'Rol Yönetimi',
      permissionManagement: 'İzin Yönetimi',
      name: 'Ad Soyad',
      email: 'E-posta',
      role: 'Rol',
      department: 'Departman',
      status: 'Durum',
      lastActive: 'Son Aktivite',
      actions: 'İşlemler',
      online: 'Çevrimiçi',
      offline: 'Çevrimdışı',
      admin: 'Yönetici',
      projectManager: 'Proje Müdürü',
      engineer: 'Mühendis',
      contractor: 'Müteahhit',
      viewer: 'Görüntüleyici',
      save: 'Kaydet',
      cancel: 'İptal',
      delete: 'Sil',
      confirmDelete: 'Bu kullanıcıyı silmek istediğinizden emin misiniz?',
      permissions: 'İzinler',
      modules: 'Modüller',
      read: 'Okuma',
      write: 'Yazma',
      deleteAction: 'Silme',
      approve: 'Onaylama',
      userDetails: 'Kullanıcı Detayları',
      preferences: 'Tercihler',
      notifications: 'Bildirimler',
      theme: 'Tema',
      defaultView: 'Varsayılan Görünüm'
    },
    en: {
      userManagement: 'User Management',
      addUser: 'Add New User',
      editUser: 'Edit User',
      deleteUser: 'Delete User',
      userList: 'User List',
      roleManagement: 'Role Management',
      permissionManagement: 'Permission Management',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      department: 'Department',
      status: 'Status',
      lastActive: 'Last Active',
      actions: 'Actions',
      online: 'Online',
      offline: 'Offline',
      admin: 'Admin',
      projectManager: 'Project Manager',
      engineer: 'Engineer',
      contractor: 'Contractor',
      viewer: 'Viewer',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this user?',
      permissions: 'Permissions',
      modules: 'Modules',
      read: 'Read',
      write: 'Write',
      deleteAction: 'Delete',
      approve: 'Approve',
      userDetails: 'User Details',
      preferences: 'Preferences',
      notifications: 'Notifications',
      theme: 'Theme',
      defaultView: 'Default View'
    }
  };

  const t = texts[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'viewer' as User['role'],
    department: '',
    permissions: [] as Permission[]
  });

  const rolePermissions = {
    admin: [
      { module: 'all', actions: ['read', 'write', 'delete', 'approve'] }
    ],
    'project-manager': [
      { module: 'projects', actions: ['read', 'write', 'approve'] },
      { module: 'suppliers', actions: ['read', 'write'] },
      { module: 'quality', actions: ['read', 'write'] },
      { module: 'safety', actions: ['read', 'write'] },
      { module: 'financial', actions: ['read', 'write'] }
    ],
    engineer: [
      { module: 'projects', actions: ['read', 'write'] },
      { module: 'quality', actions: ['read', 'write'] },
      { module: 'technical', actions: ['read', 'write'] },
      { module: 'safety', actions: ['read'] }
    ],
    contractor: [
      { module: 'projects', actions: ['read'] },
      { module: 'safety', actions: ['read', 'write'] },
      { module: 'quality', actions: ['read'] }
    ],
    viewer: [
      { module: 'projects', actions: ['read'] }
    ]
  };

  const modules = [
    'projects', 'suppliers', 'quality', 'safety', 'financial', 'technical', 'compliance'
  ];

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'viewer',
      department: '',
      permissions: rolePermissions.viewer
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      permissions: user.permissions
    });
    setShowUserModal(true);
  };

  const handleSaveUser = async () => {
    if (selectedUser) {
      await updateUser(selectedUser.id, formData);
    } else {
      await register(formData, 'defaultPassword123');
    }
    setShowUserModal(false);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    setShowDeleteConfirm(null);
  };

  const handleRoleChange = (role: User['role']) => {
    setFormData(prev => ({
      ...prev,
      role,
      permissions: rolePermissions[role]
    }));
  };

  const getStatusColor = (isOnline: boolean) => {
    return isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      'project-manager': 'bg-blue-100 text-blue-800',
      engineer: 'bg-green-100 text-green-800',
      contractor: 'bg-orange-100 text-orange-800',
      viewer: 'bg-gray-100 text-gray-800'
    };
    return colors[role as keyof typeof colors] || colors.viewer;
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Şimdi';
    if (diffMins < 60) return `${diffMins} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    return `${diffDays} gün önce`;
  };

  if (!hasPermission('users', 'read')) {
    return (
      <div className="text-center py-8">
        <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Bu sayfayı görüntüleme yetkiniz yok.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.userManagement}</h2>
        {hasPermission('users', 'write') && (
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.addUser}
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'list', label: t.userList, icon: Users },
          { id: 'roles', label: t.roleManagement, icon: Shield },
          { id: 'permissions', label: t.permissionManagement, icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* User List */}
      {activeTab === 'list' && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold">{t.name}</th>
                  <th className="text-left p-4 font-semibold">{t.email}</th>
                  <th className="text-left p-4 font-semibold">{t.role}</th>
                  <th className="text-left p-4 font-semibold">{t.department}</th>
                  <th className="text-center p-4 font-semibold">{t.status}</th>
                  <th className="text-center p-4 font-semibold">{t.lastActive}</th>
                  <th className="text-center p-4 font-semibold">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="p-4">
                      <div className="flex items-center">
                        {user.avatar && (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <div className="font-medium">{user.name}</div>
                          {user.id === currentUser?.id && (
                            <div className="text-xs text-blue-600">Siz</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {t[user.role.replace('-', '') as keyof typeof t]}
                      </span>
                    </td>
                    <td className="p-4">{user.department}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.isOnline)}`}>
                        {user.isOnline ? t.online : t.offline}
                      </span>
                    </td>
                    <td className="p-4 text-center text-gray-600">
                      {formatLastActive(user.lastActive)}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-800"
                          disabled={!hasPermission('users', 'write')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.id !== currentUser?.id && hasPermission('users', 'delete') && (
                          <button
                            onClick={() => setShowDeleteConfirm(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Role Management */}
      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(rolePermissions).map(([role, permissions]) => (
            <div key={role} className="bg-white border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="font-semibold text-gray-900">
                  {t[role.replace('-', '') as keyof typeof t]}
                </h3>
              </div>
              <div className="space-y-2">
                {permissions.map((permission, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{permission.module}:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {permission.actions.map(action => (
                        <span key={action} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {t[action as keyof typeof t]}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Permission Management */}
      {activeTab === 'permissions' && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">{t.permissionManagement}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 font-semibold">{t.modules}</th>
                  <th className="text-center p-3 font-semibold">{t.read}</th>
                  <th className="text-center p-3 font-semibold">{t.write}</th>
                  <th className="text-center p-3 font-semibold">{t.deleteAction}</th>
                  <th className="text-center p-3 font-semibold">{t.approve}</th>
                </tr>
              </thead>
              <tbody>
                {modules.map(module => (
                  <tr key={module} className="border-t border-gray-200">
                    <td className="p-3 font-medium capitalize">{module}</td>
                    <td className="p-3 text-center">
                      <UserCheck className="w-4 h-4 text-green-600 mx-auto" />
                    </td>
                    <td className="p-3 text-center">
                      <UserCheck className="w-4 h-4 text-blue-600 mx-auto" />
                    </td>
                    <td className="p-3 text-center">
                      <UserCheck className="w-4 h-4 text-red-600 mx-auto" />
                    </td>
                    <td className="p-3 text-center">
                      <UserCheck className="w-4 h-4 text-purple-600 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedUser ? t.editUser : t.addUser}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.role}
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleRoleChange(e.target.value as User['role'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="viewer">{t.viewer}</option>
                  <option value="contractor">{t.contractor}</option>
                  <option value="engineer">{t.engineer}</option>
                  <option value="project-manager">{t.projectManager}</option>
                  <option value="admin">{t.admin}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.department}
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSaveUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">{t.deleteUser}</h3>
            <p className="text-gray-600 mb-6">{t.confirmDelete}</p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;