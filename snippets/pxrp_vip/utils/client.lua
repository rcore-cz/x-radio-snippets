ESX = nil
local isVip = false

CreateThread(function()
    local breakMe = 0
    while ESX == nil do
        Wait(100)
        breakMe = breakMe + 1
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        if breakMe > 10 then
            break
        end
    end

    ESX.TriggerServerCallback('pxrp_vip:getVIPStatus', function(vip)
        isVip = vip
    end, GetPlayerServerId(PlayerId()), '1')
end)

-- this will affect who can use radio, it wont affect who can place the radio.
-- if you want affect who can place the radio do it in "utils/server.lua"
function YourSpecialPermission()
    return isVip
end
