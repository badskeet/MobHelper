<!-- Toolbar Component Template -->
<template>

    <!-- Tabbar component for switching views-tabs -->
    <f7-toolbar tabbar labels tabbar-fixed with-subnavbar><f7-link tab-link tab-link-active href="#view-signal" icon-f7="favorites" text="Сигналы" badgeColor="red" :iconBadge="this.$root.GetAllTaskCount() > 0?this.$root.GetAllTaskCount():''"></f7-link>
      <!-- <f7-link tab-link href="#view-monitor" icon-f7="graph_square" text="Монитор"></f7-link>  -->
        <f7-link tab-link href="#view-analitics" icon-f7="pie" text="Аналитика"></f7-link>
        <f7-link tab-link href="#view-allnews" icon-f7="world" text="Новости"></f7-link>
        <f7-link tab-link="#" popover-open="#popover-links" icon-f7="more_fill" text="Ещё"></f7-link>
        </f7-toolbar>

  </template>

