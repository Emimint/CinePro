package com.cinepro.backcinepro.user;

import com.cinepro.backcinepro.auth.Permission;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.cinepro.backcinepro.auth.Permission.*;


@RequiredArgsConstructor
public enum Role {

    UTILISATEUR(Collections.emptySet()),
    ADMINISTRATEUR(
            Set.of(
                    ADMINISTRATEUR_READ,
                    ADMINISTRATEUR_UPDATE,
                    ADMINISTRATEUR_CREATE,
                    ADMINISTRATEUR_DELETE,
                    AGENTCINEMA_READ,
                    AGENTCINEMA_UPDATE,
                    AGENTCINEMA_DELETE,
                    AGENTCINEMA_CREATE
            )
    ),
    AGENTCINEMA(
            Set.of(
                    AGENTCINEMA_READ,
                    AGENTCINEMA_UPDATE,
                    AGENTCINEMA_DELETE,
                    AGENTCINEMA_CREATE
            )
    )

    ;

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}