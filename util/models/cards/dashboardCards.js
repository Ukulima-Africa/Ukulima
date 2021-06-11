const dashboardCards = {
  //Default onboarding cards
  getMaterialCard(title) {
    return {
      actionRoute: '/inventory/load-items/materials',
      board: 'onboarding',
      branding: {
        xero: false,
        vend: false,
        sage: false
      },
      count: 0,
      dateCreated: new Date(),
      dateExpires: '',
      description: `Tell us about the items you purchase as materials`,
      displayCount: true,
      displayIcon: false,
      displayIconImage: '',
      image: '',
      isCompleted: false,
      isDismissable: false,
      label: `CONFIRM ITEMS`,
      listNumber: 2,
      listPosition: 2,
      options: [],
      showOptions: false,
      stockStatus: 'good',
      title: title || 'SET-UP'
    }
  },
  getMakeCard(title) {
    return {
      actionRoute: '/inventory/load-items/make',
      board: 'onboarding',
      branding: {
        xero: false,
        vend: false,
        sage: false
      },
      count: 0,
      dateCreated: new Date(),
      dateExpires: '',
      description: `Tell us about the items you make to sell`,
      displayCount: true,
      displayIcon: false,
      displayIconImage: '',
      image: '',
      isCompleted: false,
      isDismissable: false,
      label: `CONFIRM ITEMS`,
      listNumber: 2,
      listPosition: 3,
      options: [],
      showOptions: false,
      stockStatus: 'good',
      title: title || 'SET-UP'
    }
  },
  getResellCard(title) {
    return {
      actionRoute: '/inventory/load-items/resell',
      board: 'onboarding',
      branding: {
        xero: false,
        vend: false,
        sage: false
      },
      count: 0,
      dateCreated: new Date(),
      dateExpires: '',
      description: `Tell us about the items you purchase to resell`,
      displayCount: true,
      displayIcon: false,
      displayIconImage: '',
      image: '',
      isCompleted: false,
      isDismissable: false,
      label: `CONFIRM ITEMS`,
      listNumber: 2,
      listPosition: 1,
      options: [],
      showOptions: false,
      stockStatus: 'good',
      title: title || 'SET-UP'
    }
  },
  getLinkedToXeroCard(title) {
    return {
      actionRoute: '',
      board: 'onboarding',
      branding: {
        xero: true,
        vend: false,
        sage: false
      },
      count: 0,
      dateCreated: new Date(),
      dateExpires: '',
      description: `Data synced successfully`,
      displayCount: false,
      displayIcon: true,
      displayIconImage: '',
      image: '',
      isCompleted: true,
      isDismissable: false,
      label: ``,
      listNumber: 3,
      listPosition: 1,
      options: [],
      showOptions: false,
      stockStatus: 'xero',
      title: title || 'SET-UP'
    }
  },
  getLinkedToVendCard(title) {
    return {
      actionRoute: '',
      board: 'onboarding',
      branding: {
        xero: false,
        vend: true,
        sage: false
      },
      count: 0,
      dateCreated: new Date(),
      dateExpires: '',
      description: `Data synced successfully`,
      displayCount: false,
      displayIcon: true,
      displayIconImage: '',
      image: '',
      isCompleted: true,
      isDismissable: false,
      label: ``,
      listNumber: 3,
      listPosition: 1,
      options: [],
      showOptions: false,
      stockStatus: 'vend',
      title: title || 'SET-UP'
    }
  },
  getLinkedToSageCard(title) {
    return {
      actionRoute: '',
      board: 'onboarding',
      branding: {
        xero: false,
        vend: false,
        sage: true
      },
      count: 0,
      dateCreated: new Date(),
      dateExpires: '',
      description: `Linked to Sage`,
      displayCount: false,
      displayIcon: true,
      displayIconImage: '',
      image: '',
      isCompleted: true,
      isDismissable: false,
      label: ``,
      listNumber: 3,
      listPosition: 3,
      options: [],
      showOptions: false,
      stockStatus: 'sage',
      title: title || 'SET-UP'
    }
  },
  //Default daily dashboard cards
  getDailyDashboardCard(
    actionRoute,
    title,
    description,
    label,
    count,
    number,
    position,
    stockStatus
  ) {
    return {
      actionRoute: actionRoute || '',
      board: 'daily-dashboard',
      branding: {
        xero: false,
        vend: false,
        sage: false
      },
      count: count || 0,
      dateCreated: new Date(),
      dateExpires: '',
      description: description || '',
      displayCount: true,
      displayIcon: false,
      displayIconImage: '',
      image: '',
      isCompleted: false,
      isDismissable: false,
      label: label || '',
      listNumber: number || 2,
      listPosition: position || 1,
      options: [],
      showOptions: false,
      stockStatus: stockStatus || '',
      title: title || 'MADE FOR SALE'
    }
  },
  //Default daily task cards
  getDailyTasksCard(
    title,
    description,
    label,
    showOptions,
    options,
    number,
    position
  ) {
    return {
      actionRoute: '',
      board: 'daily-tasks',
      branding: {
        xero: false,
        vend: false,
        sage: false
      },
      count: 0,
      dateCreated: new Date(),
      dateExpires: '',
      description: description ? description : '',
      displayCount: true,
      displayIcon: false,
      displayIconImage: '',
      image: '',
      isCompleted: false,
      isDismissable: false,
      label: label ? label : '',
      listNumber: number ? number : 1,
      listPosition: position ? position : 1,
      options: options ? options : [],
      showOptions: showOptions ? showOptions : false,
      stockStatus: 'good',
      title: title || 'MADE FOR SALE'
    }
  }
}
export default dashboardCards
