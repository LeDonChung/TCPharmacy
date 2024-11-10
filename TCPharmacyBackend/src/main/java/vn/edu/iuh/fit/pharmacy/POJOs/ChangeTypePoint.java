package vn.edu.iuh.fit.pharmacy.POJOs;

public enum ChangeTypePoint {
    EARN("EARN"),
    REDEEM("REDEEM"),
    ADJUST("ADJUST");

    private final String name;

    ChangeTypePoint(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return name;
    }
}
