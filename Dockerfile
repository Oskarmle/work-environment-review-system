FROM quay.io/keycloak/keycloak:26.4.7

# Render must expose port 8080
ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_PORT=8080
ENV KC_PROXY=edge

# Run Keycloak in production mode
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start"]