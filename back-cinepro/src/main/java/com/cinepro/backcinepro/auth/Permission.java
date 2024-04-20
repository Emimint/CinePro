package com.cinepro.backcinepro.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMINISTRATEUR_READ("administrateur:read"),
    ADMINISTRATEUR_UPDATE("administrateur:update"),
    ADMINISTRATEUR_CREATE("administrateur:create"),
    ADMINISTRATEUR_DELETE("administrateur:delete"),
    AGENTCINEMA_READ("agentcinema:read"),
    AGENTCINEMA_UPDATE("agentcinema:update"),
    AGENTCINEMA_CREATE("agentcinema:create"),
    AGENTCINEMA_DELETE("agentcinema:delete")

    ;

    @Getter
    private final String permission;
}
