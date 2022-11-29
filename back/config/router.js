// Created by Seunggwan, Back on 2022.11.29
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
// prettier-ignore
export default {
    server_port: 8080,
    route_info: [
        // dev
        {file:'./dev/get.js',  path:'/dev/get',    method:'pong',  type:'get'},
        {file:'./dev/post.js', path:'/dev/post',   method:'pong',  type:'post'},

        // ksp
        {file:'./ksp/claimableReward.js', path:'/ksp/claimableReward', method:'ClaimableReward', type:'post'},
        {file:'./ksp/claimedReward.js',   path:'/ksp/claimedReward',   method:'ClaimedReward',   type:'post'},
        {file:'./ksp/dailyReward.js',     path:'/ksp/dailyReward',     method:'DailyReward',     type:'post'},
        {file:'./ksp/lockedKSP.js',       path:'/ksp/lockedKSP',       method:'LockedKSP',       type:'post'},
        {file:'./ksp/stakingShare.js',    path:'/ksp/stakingShare',    method:'StakingShare',    type:'post'},
        {file:'./ksp/vKSP.js',            path:'/ksp/vKSP',            method:'vKSP',            type:'post'},

        // token
        {file:'./token/name.js',        path:'/token/name',        method:'Name',        type:'post'},
        {file:'./token/symbol.js',      path:'/token/symbol',      method:'Symbol',      type:'post'},
        {file:'./token/balance.js',     path:'/token/balance',     method:'Balance',     type:'post'},
        {file:'./token/totalSupply.js', path:'/token/totalSupply', method:'TotalSupply', type:'post'},
        {file:'./token/priceOnKSP.js',  path:'/token/priceOnKSP',  method:'PriceOnKSP',  type:'post'},

        // wallet
        {file:'./wallet/balance.js', path:'/wallet/balance',   method:'Balance',  type:'post'},
    ],
    doRelease : function(connection) {
      connection.release(
        function(err) {
            if (err) {
                console.error(err.message);
            }
        });
    }
}
