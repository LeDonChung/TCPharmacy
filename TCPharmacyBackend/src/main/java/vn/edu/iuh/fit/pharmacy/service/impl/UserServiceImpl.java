package vn.edu.iuh.fit.pharmacy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.pharmacy.POJOs.Role;
import vn.edu.iuh.fit.pharmacy.POJOs.User;
import vn.edu.iuh.fit.pharmacy.mappers.UserMapper;
import vn.edu.iuh.fit.pharmacy.repositories.RoleRepository;
import vn.edu.iuh.fit.pharmacy.repositories.UserRepository;
import vn.edu.iuh.fit.pharmacy.service.UserService;
import vn.edu.iuh.fit.pharmacy.utils.RoleConstraints;
import vn.edu.iuh.fit.pharmacy.utils.request.UserRegisterRequest;
import vn.edu.iuh.fit.pharmacy.utils.response.UserResponse;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserResponse register(UserRegisterRequest request) {
        User user = userMapper.toEntity(request);

        Optional<User> userOptional = userRepository.findByUsername(user.getPhoneNumber());
        if (userOptional.isPresent()) {
            return userMapper.toDto(userOptional.get());
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);

        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByCode(RoleConstraints.ROLE_PATIENT));
        user.setRoles(roles);

        User response = userRepository.save(user);

        return userMapper.toDto(response);
    }
}
