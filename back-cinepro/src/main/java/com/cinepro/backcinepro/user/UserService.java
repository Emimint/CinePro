package com.cinepro.backcinepro.user;


import com.cinepro.backcinepro.auth.ChangePasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;


@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // vérifie si le mot de passe actuel est le bon :
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // vérifie si les deux nouveaux mots de passe sont identiques :
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // mets à jour le mot de passe de l'utilisateur :
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // enregistre l'entité utilisateur dans la base de données :
        repository.save(user);
    }
}
